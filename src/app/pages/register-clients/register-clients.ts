import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroPhoneSolid,
  heroBuildingOfficeSolid,
  heroUserSolid,
  heroDocumentArrowUpSolid,
  heroXMarkSolid,
  heroIdentificationSolid
} from '@ng-icons/heroicons/solid'
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { ClientsService } from '../../core/services/clients.service';
import { EventEmitter } from 'stream';
import { Subject } from 'rxjs';
import { UploadDocButton, UploadDocData } from '../../shared/components/upload-doc-button/upload-doc-button';
import { AlertDialog, AlertDialogData } from '../../shared/dialogs/alert.dialog/alert.dialog';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-clients',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
    NgIcon,
    MatIcon,
    UploadDocButton
  ],
  templateUrl: './register-clients.html',
  styleUrl: './register-clients.scss',
  providers: [provideIcons({
    heroPhoneSolid,
    heroBuildingOfficeSolid,
    heroUserSolid,
    heroDocumentArrowUpSolid,
    heroXMarkSolid,
    heroIdentificationSolid
  })]
})
export class RegisterClients {
  fb = new FormBuilder();
  form = this.fb.group({
    representativeName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\+?\d{10,13}$/)]],
    companyName: ['', Validators.required],
    rfc: ['', [Validators.required, Validators.pattern(/^\w{4}\d{6}[\w\d]{3}$/)]]
  });

  onSubmit = new Subject<void>();

  private _selectedFile: File | null = null;
  private _selectedFileName: string | null = null;  

  constructor(
    private _clientsService: ClientsService,
    private _dialog: MatDialog,
    private _router: Router  
  ) { }

  onUpload(data: UploadDocData) {
    this._selectedFile = data.selectedFile;
    this._selectedFileName = data.selectedFileName;
  }

  submit() {
    this.onSubmit.next()
    if (this.form.valid && this._selectedFile) {

      // Convertir el archivo en Base64 para enviarlo en el JSON object
      const reader = new FileReader();
      reader.onload = async () => {
        console.log('Reading file...');
        
        const base64Data = reader.result as string;
        // Quitar la primera parte del resultado 'data:<mimetype>'
        const base64String = base64Data.split(',')[1];

        await this._clientsService.registerClient({
          representative_name: this.form.value.representativeName!,
          email: this.form.value.email!,
          phone_number: this.form.value.phoneNumber!,
          company_name: this.form.value.companyName!,
          document: {
            mimetype: this._selectedFile!.type,
            filename: this._selectedFile!.name,
            data: base64String // Send as base64 string
          },
          rfc: this.form.value.rfc!
        });

        const alertDialogData: AlertDialogData = {
          title: 'Cliente registrado',
          message: 'El cliente ha sido registrado exitosamente.',
          confirmButtonText: 'Aceptar'
        };

        this._dialog.open(AlertDialog, {
          data: alertDialogData
        }).afterClosed().subscribe(() => {
          this._router.navigate(['']);
        });
      };

      reader.readAsDataURL(this._selectedFile);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
