import { ChangeDetectorRef, Component, inject, input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { Router, RouterLink } from "@angular/router";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { ClientsService } from "../../core/services/clients.service";
import { UploadDocButton, UploadDocData } from "../../shared/components/upload-doc-button/upload-doc-button";
import { Subject } from "rxjs";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { heroUserSolid, heroBuildingOfficeSolid, heroIdentificationSolid, heroPhoneSolid } from '@ng-icons/heroicons/solid'
import { ClientSeeEditPlaceholder } from "./components/client-see-edit-placeholder/client-see-edit-placeholder";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ViewDocumentDialog } from "./dialogs/view-document-dialog/view-document.dialog";
import { AlertDialog, AlertDialogData } from "../../shared/dialogs/alert.dialog/alert.dialog";

@Component({
    templateUrl: './client-see-edit.html',
    styleUrl: './client-see-edit.scss',
    imports: [
        MatCardModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIcon,
        NgIcon,
        UploadDocButton,
        MatInputModule,
        MatButtonModule,
        ClientSeeEditPlaceholder,           
    ],
    providers: [provideIcons({ heroUserSolid, heroBuildingOfficeSolid, heroIdentificationSolid, heroPhoneSolid })]
})
export class ClientSeeEdit implements OnInit {
    clientId = input.required<string>();
    router = inject(Router)
    form: FormGroup | null = null;
    private _fb = new FormBuilder();

    selectedFile: File | null = null;
    selectedFileName: string | null = null;

    onSubmit = new Subject<void>()

    // Track dialog references to prevent multiple openings
    private _alertDialogRef: MatDialogRef<AlertDialog> | null = null;
    private _documentDialogRef: MatDialogRef<ViewDocumentDialog> | null = null;

    constructor(
        private _clientsService: ClientsService,
        private _changeDetector: ChangeDetectorRef,
        private _dialog: MatDialog
    ) {

    }

    ngOnInit(): void {
        console.log('The client id is: ', this.clientId());

        if (!this.clientId()) {
            console.log('El Id del cliente no es valido.')

            this.router.navigate(['']);
            return;
        }

        this._clientsService.getClient(this.clientId()).subscribe({
            next: client => {

                console.log('Se ha obtenido la informacion del cliente: ', client);
                this.form = this._fb.group({
                    representativeName: [client.representative_name, Validators.required],
                    email: [client.email, [Validators.required, Validators.email]],
                    phoneNumber: [client.phone_number, [Validators.required, Validators.pattern(/^\+?\d{10,13}$/)]],
                    companyName: [client.company_name, Validators.required],
                    rfc: [client.rfc, [Validators.required, Validators.pattern(/^\w{4}\d{6}[\w\d]{3}$/)]]
                });

                this.selectedFileName = client.document.filename;
                this.selectedFile = null; // No se tiene el archivo original, solo su nombre                

                this._changeDetector.detectChanges();
            },
            error: err => {
                console.error(err);
                this.router.navigate(['']);
            }
        });
    }

    submit() {
        // Se le avisa al boton de subir documento que se va a enviar el formulario
        // para checar si hay un archivo seleccionado y mostrar el error en caso de que no
        this.onSubmit.next();

        if (this.form?.invalid || !this.selectedFileName) {
            console.error('Faltan datos para actualizar el cliente.');
            return;
        }

        const body = {
            ...this.form!.value,        
        };

        const afterUpdateDialog = () => {
            // Prevent opening multiple alert dialogs
            if (this._alertDialogRef) {
                return;
            }

            const alertDialogData: AlertDialogData = {
                title: 'Cliente actualizado',
                message: 'El cliente se ha actualizado correctamente.',
                confirmButtonText: 'Aceptar'
            }
            
            this._alertDialogRef = this._dialog.open(AlertDialog, {
                data: alertDialogData
            });

            this._alertDialogRef.afterClosed().subscribe(() => {
                this._alertDialogRef = null; // Reset reference
                
                // Trigger refresh first, then navigate
                this._clientsService.$onUpdateClients.next();
                
                // Small delay to ensure the refresh is triggered before navigation
                setTimeout(() => {
                    this.router.navigate(['']);
                }, 100);
            });
        }

        if (!this.selectedFile) {
            console.error('Se actualizo el cliente con el mismo documento.');
            this._clientsService.updateClient(this.clientId(), body).subscribe({
                next: () => {
                    console.log('Cliente actualizado correctamente.');
                    afterUpdateDialog();
                },
                error: err => {
                    console.error('Error al actualizar el cliente: ', err);
                }
            });

            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            const fileData = reader.result as string;
            const base64String = fileData.split(',')[1];
            body['document'] = {
                filename: this.selectedFileName,
                data: base64String,
                mimetype: this.selectedFile?.type
            };
            
            console.log('Update client with document data: ', body);

            this._clientsService.updateClient(this.clientId(), body).subscribe({
                next: () => {
                    console.log('Cliente actualizado correctamente.');

                    afterUpdateDialog();
                },
                error: err => {
                    console.error('Error al actualizar el cliente: ', err);
                }
            });
        };

        reader.readAsDataURL(this.selectedFile);
    }

    onUpload(data: UploadDocData) {
        this.selectedFile = data.selectedFile;
        this.selectedFileName = data.selectedFileName;
    }

    openDocument() {
        // Prevent opening multiple document dialogs
        if (this._documentDialogRef) {
            return;
        }

        this._documentDialogRef = this._dialog.open(ViewDocumentDialog, {
            data: {
                clientId: this.clientId()
            },
            minWidth: '80vw',
            minHeight: '60vh',            
        });

        this._documentDialogRef.afterClosed().subscribe(() => {
            this._documentDialogRef = null; // Reset reference
        });
    }
}