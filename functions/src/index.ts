const functions = require('firebase-functions');
const express = require('express');
import {Request, Response} from 'express';
import {ngExpressEngine} from '@nguniversal/express-engine'
const { join } = require('path');
const { AppServerModule } = require('./dist/server/main');

// Express server
const app = express();
// Set the view engine
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule,
}));
app.set('view engine', 'html');
app.set('views', join(__dirname, 'dist', 'browser'));// Serve static files
app.get('*.*', express.static(join(__dirname, 'dist', 'browser')));// All regular routes use the Universal engine
app.get('*', (req: Request, res: Response) => {
  res.render('index', { req });
});

// Firebase Function
exports.ssr = functions.https.onRequest(app);