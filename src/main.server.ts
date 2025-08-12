import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { config } from './app/app.config.server';

const bootstrap = () => {
  return bootstrapApplication(App, {
    ...config,   
  });
};

export default bootstrap;
