import { Routes } from "@angular/router";
import clientSeeEditRoutes from "../client-see-edit/client-see-edit.routes";

const homeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home').then(m => m.Home)
  },
  {
    path: 'register',
    loadComponent: () => import('../register-clients/register-clients').then(m => m.RegisterClients)
  },
  {
    path: 'client',
    children: clientSeeEditRoutes
  }
];

export default homeRoutes;
