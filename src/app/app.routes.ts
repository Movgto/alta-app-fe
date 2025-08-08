import { Routes } from '@angular/router';
import homeRoutes from './pages/home/home.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main/main').then(m => m.Main),
        children: homeRoutes
    }
];
