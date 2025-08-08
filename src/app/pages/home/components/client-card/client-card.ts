import { Component, inject, input } from '@angular/core';
import { Client } from '../../../../shared/interfaces/client.interface';
import { MatExpansionModule } from "@angular/material/expansion";
import { MatButtonModule } from "@angular/material/button";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroTrashSolid, heroEyeSolid } from '@ng-icons/heroicons/solid';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ClientsService } from '../../../../core/services/clients.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AlertDialog, AlertDialogData } from '../../../../shared/dialogs/alert.dialog/alert.dialog';

@Component({
  selector: 'app-client-card',
  imports: [
    MatExpansionModule,
    MatButtonModule,
    NgIcon,
    MatIcon,
    RouterLink
  ],
  templateUrl: './client-card.html',
  styleUrl: './client-card.scss',
  providers: [provideIcons({ heroTrashSolid, heroEyeSolid })]
})
export class ClientCard {
  clientSignal = input.required<Client>();
  private _clientsService = inject(ClientsService);
  private _dialog = inject(MatDialog);
  private _alertDialogRef: MatDialogRef<AlertDialog> | null = null;

  get client() {
    return this.clientSignal();
  }

  deleteClient(e: MouseEvent): void {
    e.stopPropagation(); // Previene que el panel de expansión se abra o cierre

    if (this._alertDialogRef) return;


    console.log('Client deleted successfully');

    const alertDialogData: AlertDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this client?',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    };

    this._alertDialogRef = this._dialog.open(AlertDialog, {
      data: alertDialogData
    });

    this._alertDialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this._clientsService.deleteClient(this.clientSignal().id).subscribe({
          next: () => {
            console.log('Client deleted successfully');
            
            this._clientsService.$onUpdateClients.next();            
          },
          error: (err) => {
            console.error('Error deleting client: ', err);
          }
        });
      }
      this._alertDialogRef = null;
    });
  }
}
