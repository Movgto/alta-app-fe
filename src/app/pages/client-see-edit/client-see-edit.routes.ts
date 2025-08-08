import { Route } from "@angular/router";

const clientSeeEditRoutes: Route[] = [
    {
        path: ':clientId',
        loadComponent: () => import('./client-see-edit').then(m => m.ClientSeeEdit)

    }
]

export default clientSeeEditRoutes;