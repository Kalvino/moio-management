import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AppComponent } from './core/containers/app/app.component';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { rootRoutes } from './app.routes';
import de from '@angular/common/locales/de';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { map, take } from 'rxjs/operators';
import { JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { select, Store, StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { ErrorsModule } from './errors/errors.module';
import { DashboardModule } from './dashboard/dashboard.module';
import * as fromAuth from './auth/reducers';


/**
 * Angular material
 */

import {
  MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule, MatTableModule,
} from '@angular/material';


/**
 * register locales
 * all required locales have to be imported
 */
registerLocaleData(de);

/**
 * factory function to instantiate and config
 * the tranlation service
 * @param http ng http client
 */
export function createTanslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/**
 * jwt options factory to obtain token from the
 * store
 * @param store Store
 */
export function jwtOptionsFactory(store) {
  return {
    whitelistedDomains: environment.whitelistedDomains,
    skipWhenExpired: true,
    tokenGetter: () => {
      return store.pipe(
        select(fromAuth.getAccessToken),
        map(token => token),
        take(1)
      ).toPromise();
    }
  };
}

/**
 * strip the preferred language from the browser
 */
function getBrowserLanguage() {
  let locale = 'de';

  if (typeof window['Intl'] !== 'undefined' && window.navigator.language) {
    locale = window['Intl'].getCanonicalLocales(window.navigator.language)[0];

    if (locale.indexOf('-') !== -1) {
      locale = locale.substr(0, 2);
    }
  }

  return locale;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(rootRoutes, {useHash: true}),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTanslateLoader),
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Store]
      }
    }),
    AuthModule,
    ErrorsModule,
    DashboardModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 10,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([]),
    AppRoutingModule
  ],
  exports: [RouterModule],
  providers: [
    { provide: LOCALE_ID, useValue: getBrowserLanguage() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
