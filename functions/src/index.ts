import { join } from "path";
import express, { Request, Response } from "express";
import cors from 'cors';
import * as functions from 'firebase-functions';

const apiUrl = process.env.API_URL || 'FAILED_GETTING_API_URL_FROM_ENV';

// Function to handle server-side rendering
const app = async () => {
  const serverPath = join(__dirname, "..", "dist", "server", "server.mjs");
  const { reqHandler } = await import(serverPath);
  return reqHandler;
};

// Function to handle API calls
const appCalls = express();

// Automatically allow cross-origin requests
appCalls.use(cors({ origin: true }));

// Proxy requests to your existing server

appCalls.use(async (req: Request, res: Response) => {
  const SERVER_URL = apiUrl;
  const path = req.path;
  const url = `${SERVER_URL}${path}`;

  console.log('Forwarding request to:', url);
  const options = {
    method: req.method,
    headers: req.headers,
    body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined
  };

  try {
    const response = await fetch(url, {
      body: options.body,
      method: options.method,
      headers: options.headers as HeadersInit
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error forwarding request:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the SSR function
export const ssr = functions.https.onRequest(async (req, res) => {
  try {
    const handler = await app();
    return handler(req, res);
  } catch (error) {
    console.error('Error in SSR function:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Export the API function
export const api = functions.https.onRequest(appCalls);
