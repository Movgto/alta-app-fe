import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion'
import { ClientsService } from '../../core/services/clients.service';
import { ClientCard } from './components/client-card/client-card';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-home',
  imports: [MatExpansionModule, ClientCard, SkeletonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  clientsService = inject(ClientsService);

  clients = this.clientsService.clients;
  loadingClients = this.clientsService.isLoading;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.clientsService.$onUpdateClients.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    })
  }

  ngOnInit(): void {
    console.log('Home component initialized');
    console.log('Clients:', this.clients());
  }
}
