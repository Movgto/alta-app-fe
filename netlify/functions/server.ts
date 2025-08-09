import { Handler } from '@netlify/functions';

export const handler: Handler = async (event, context) => {
  try {
    console.log('Function triggered for:', event.path);
    
    // Try to import the Angular server module
    let serverModule;
    try {
      // Try different import paths that might work in Netlify environment
      serverModule = await import('../../dist/alta-app-fe/server/server.mjs');
    } catch (importError) {
      console.error('Server import failed:', importError);
      // Fallback to static serving
      return {
        statusCode: 302,
        headers: {
          Location: '/index.html'
        }
      };
    }

    const { reqHandler } = serverModule;
    if (!reqHandler) {
      throw new Error('reqHandler not found in server module');
    }

    console.log('Successfully imported reqHandler');

    // Create a proper Node.js request-like object
    const url = event.path + (event.queryStringParameters ?
      '?' + new URLSearchParams(
        Object.fromEntries(
          Object.entries(event.queryStringParameters).filter(([_, v]) => v !== undefined) as [string, string][]
        )
      ).toString() : '');
    
    const req = {
      url,
      method: event.httpMethod || 'GET',
      headers: event.headers || {},
      body: event.body || '',
      originalUrl: url,
    };

    // Create response handler
    return await new Promise<import('@netlify/functions').HandlerResponse>((resolve) => {
      const chunks: Buffer[] = [];
      let statusCode = 200;
      const headers: Record<string, string> = {};

      const res = {
        statusCode: 200,
        setHeader(name: string, value: string | string[]) {
          headers[name] = Array.isArray(value) ? value.join(', ') : value;
        },
        writeHead(status: number, responseHeaders?: Record<string, string>) {
          statusCode = status;
          if (responseHeaders) {
            Object.assign(headers, responseHeaders);
          }
        },
        write(chunk: any) {
          chunks.push(Buffer.from(chunk));
        },
        end(chunk?: any) {
          if (chunk) {
            chunks.push(Buffer.from(chunk));
          }
          
          const body = Buffer.concat(chunks).toString('utf8');
          
          resolve({
            statusCode,
            headers: {
              'Content-Type': headers['Content-Type'] || 'text/html',
              ...headers
            },
            body,
          });
        },
        on() {}, // Mock for compatibility
        emit() {}, // Mock for compatibility
      };

      try {
        reqHandler(req, res);
      } catch (handlerError) {
        console.error('Request handler error:', handlerError);
        resolve({
          statusCode: 500,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Request handler error', message: handlerError instanceof Error ? handlerError.message : String(handlerError) })
        });
      }
    });

  } catch (error) {
    console.error('Function error:', error);
    
    // Return a simple fallback response
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        error: 'Server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }),
    };
  }
};
