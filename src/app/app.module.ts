import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TokenInterceptor} from './token.interceptor';
import {ApiComponent} from './api/api.component';
import {RouterModule} from '@angular/router';

const routes = [
  {
    path: '**',
    component: AppComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forChild(routes),
    AppRoutingModule,
    // ApiModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    ApiComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
