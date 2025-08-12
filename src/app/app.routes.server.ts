import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server 
  },
  {
    path: 'register',
    renderMode: RenderMode.Server
  },
  {
    path: 'client/:clientId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const apiUrl = process.env['API_URL'] || 'http://localhost:3000/api'; // Fallback to localhost
      try {
        const response = await fetch(`${apiUrl}/clients`);
        if (response.ok) {
          const clients = await response.json();
          return clients.slice(0, 10).map((client: any) => ({ 
            clientId: client.id.toString() 
          })); // Limit to first 10 for build performance
        }
      } catch (error) {
        console.warn('Failed to fetch clients for prerendering:', error);
      }
      
      // Fallback: Return empty array to skip prerendering
      return [];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
