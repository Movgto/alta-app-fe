import { Inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from "@angular/core";
import { isPlatformServer } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const API_URL_KEY = makeStateKey<string>('API_URL');

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private _apiUrl: string = environment.apiUrl;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private transferState: TransferState,
        private http: HttpClient
    ) {
        if (isPlatformServer(this.platformId)) {
            // Server-side: Set the API_URL in TransferState
            this._apiUrl = process.env['API_URL'] || 'http://localhost:3000/api'; // Fallback to localhost
            this.transferState.set(API_URL_KEY, this._apiUrl);
        } else {
            // Client-side: Retrieve the API_URL from TransferState
            this._apiUrl = this.transferState.get(API_URL_KEY, '/api'); // Fallback to '/api'
        }
    }

    get apiUrl(): string {
        return this._apiUrl;
    }

    getData(endpoint: string) {
        return this.http.get(`${this.apiUrl}/${endpoint}`);
    }
}