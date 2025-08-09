import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender    
  },
  {
    path: 'register',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'client/:clientId',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      // For production: Fetch real client IDs from your API
      try {
        const apiUrl = process.env['API_URL'] || 'http://localhost:3000/api';
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
