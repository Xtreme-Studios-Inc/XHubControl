import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
// import * as dotenv from 'dotenv';
import { AppComponent } from './app/app.component';

// dotenv.config();

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
