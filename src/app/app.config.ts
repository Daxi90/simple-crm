import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"simple-crm-75b10","appId":"1:68285820468:web:f6388abaa323ff39d26461","storageBucket":"simple-crm-75b10.appspot.com","apiKey":"AIzaSyCLpFGWX7EJFF3Cdn-rVyfwrg-1sbaLjMk","authDomain":"simple-crm-75b10.firebaseapp.com","messagingSenderId":"68285820468"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
