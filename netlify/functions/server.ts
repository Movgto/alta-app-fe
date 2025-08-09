import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

// This will be the Angular Universal server function
export const handler = async (event: any, context: any) => {
  try {
    // Import the Angular server bundle with proper file URL
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const serverPath = join(__dirname, '../../dist/alta-app-fe/server/server.mjs');
    const serverUrl = pathToFileURL(serverPath).href;
    
    const serverModule = await import(serverUrl);
    const { reqHandler } = serverModule;
    
    const req = {
      url: event.path + (event.queryStringParameters ? 
        '?' + new URLSearchParams(event.queryStringParameters).toString() : ''),
      method: event.httpMethod,
      headers: event.headers,
      body: event.body,
    };

    return new Promise((resolve, reject) => {
      const chunks: string[] = [];
      
      const res = {
        statusCode: 200,
        headers: {},
        writeHead(status: number, headers?: Record<string, string>) {
          this.statusCode = status;
          if (headers) {
            Object.assign(this.headers, headers);
          }
        },
        setHeader(name: string, value: string) {
          this.headers[name] = value;
        },
        write(chunk: string) {
          chunks.push(chunk);
        },
        end(chunk?: string) {
          if (chunk) chunks.push(chunk);
          resolve({
            statusCode: this.statusCode,
            headers: this.headers,
            body: chunks.join(''),
          });
        },
      };

      // Call the Angular Universal app
      reqHandler(req, res);
    });
  } catch (error) {
    console.error('SSR Error:', error);
    
    // Fallback to serving the static index.html
    try {
      const indexPath = join(dirname(fileURLToPath(import.meta.url)), 
        '../../dist/alta-app-fe/browser/index.html');
      const html = readFileSync(indexPath, 'utf-8');
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'text/html',
        },
        body: html,
      };
    } catch (fallbackError) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error' }),
      };
    }
  }
};
