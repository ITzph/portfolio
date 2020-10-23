import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { environment } from '../environments/environment';
import { HmrModule, stateSetter } from '../hmr.module';
import { CustomSerializer } from './merged-route-serializer';
import { HeaderModule } from './modules/header/header.module';
import { FooterModule } from './modules/footer/footer.module';
import { HttpHeaderInterceptor } from './interceptors/http-header.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import localeSG from '@angular/common/locales/sg';
import { registerLocaleData } from '@angular/common';

import * as fromProfile from './reducers/profile.reducer';

registerLocaleData(localeSG);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [stateSetter] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromProfile.profileFeatureKey, fromProfile.reducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    HeaderModule,
    FooterModule,
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeaderInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID,
      useValue: 'sg',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule extends HmrModule {}
