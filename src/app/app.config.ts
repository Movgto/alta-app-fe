import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config'
import Aura from '@primeuix/themes/aura'
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFunctions, provideFunctions } from '@angular/fire/functions';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideRouter(routes, withComponentInputBinding()), provideClientHydration(withEventReplay()), provideFirebaseApp(() => initializeApp({ projectId: "alta-app-firebase", appId: "1:212957372137:web:37b2daaf55247061bf1a78", storageBucket: "alta-app-firebase.firebasestorage.app", apiKey: "AIzaSyC5AQIAS-JOa9VsA9tF6c_wnt3uV3Za_QU", authDomain: "alta-app-firebase.firebaseapp.com", messagingSenderId: "212957372137", measurementId: "G-3C77JCZZB2" })), provideFunctions(() => getFunctions()), provideFirebaseApp(() => initializeApp({ projectId: "alta-app-firebase", appId: "1:212957372137:web:37b2daaf55247061bf1a78", storageBucket: "alta-app-firebase.firebasestorage.app", apiKey: "AIzaSyC5AQIAS-JOa9VsA9tF6c_wnt3uV3Za_QU", authDomain: "alta-app-firebase.firebaseapp.com", messagingSenderId: "212957372137", measurementId: "G-3C77JCZZB2" })), provideFunctions(() => getFunctions())
  ]
};
