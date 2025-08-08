import { Component, Inject, Optional, signal } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { ClientsService } from "../../../../core/services/clients.service";
import { DocumentViewer } from "../../../../shared/components/document-viewer/document-viewer";

interface FileData {
    id: string
    data: string
    mimetype: string
    filename: string;
}

@Component({
    selector: 'app-view-document-dialog',
    templateUrl: './view-document.dialog.html',
    styleUrls: ['./view-document.dialog.scss'],
    imports: [
        MatDialogModule,
        MatButtonModule,
        DocumentViewer
    ]
})
export class ViewDocumentDialog {
    clientId = signal<string|null>(null);
    fileData = signal<FileData|null>(null);
    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<ViewDocumentDialog>,
        private _clientsService: ClientsService
    ) {
        if (!data || !data.clientId) return;

        const clientId = data.clientId;

        console.log('Dialog data received:', data);

        this.clientId.set(clientId);

        this._clientsService.getClientDocument(clientId).subscribe(res => {            
            console.log('Document response received:', res);
            

            this.fileData.set(res);
        })
    }

    closeDialog() {
        this._dialogRef.close();
    }
}