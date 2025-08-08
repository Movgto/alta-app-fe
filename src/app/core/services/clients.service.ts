import { inject, Injectable, signal } from "@angular/core";
import { Client } from "../../shared/interfaces/client.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { lastValueFrom, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientsService {
    clients = signal<Client[]>([]);
    private _http = inject(HttpClient);
    private _loading = signal(false);
    $onUpdateClients = new Subject<void>();

    constructor() {
        this.getClients();

        this.$onUpdateClients.subscribe(() => {
            this.getClients();
        });
    }    

    private getClients() {
        this._loading.set(true);
        this._http.get<Client[]>(`${environment.apiUrl}/clients`).subscribe(clients => {
            this.clients.set(clients);
            this._loading.set(false);
        });
    }

    getClient(id: string) {
        return this._http.get<Client>(`${environment.apiUrl}/clients/${id}`);
    }

    getClientDocument(clientId: number) {
        return this._http.get<{id: string, filename: string, data: string, mimetype: string}>(`${environment.apiUrl}/clients/${clientId}/document`);
    }

    async registerClient(client: Omit<Client, 'id'>) {
        await lastValueFrom(this._http.post<Client>(`${environment.apiUrl}/clients`, client));
        
        this.getClients();
    }

    updateClient(id: string, client: Partial<Client>) {
        return this._http.put<Client>(`${environment.apiUrl}/clients/${id}`, client);
    }

    deleteClient(id: number) {
        return this._http.delete(`${environment.apiUrl}/clients/${id}`);
    }

    get isLoading() { return this._loading(); }

}