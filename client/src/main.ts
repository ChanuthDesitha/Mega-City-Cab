import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { LoginFormComponent } from './app/login-form/login-form.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

bootstrapApplication(LoginFormComponent, {
  providers: [
    provideHttpClient(),
    [provideRouter(routes)]
  ],
}).catch((err) => console.error(err));
