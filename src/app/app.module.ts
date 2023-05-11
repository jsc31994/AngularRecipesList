import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducer';
import { authReducer } from './auth/store/auth.reducer';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { environment } from '../environments/environment';
import { RecipesEffects } from './recipes/store/recipes.effects';

@NgModule({
  // components, directives, and pipes
  declarations: [AppComponent, HeaderComponent],
  // other modules
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(fromApp.appReducer),
    EffectsModule.forRoot([AuthEffects, RecipesEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot(),
    // we are now lazy loading the rest of the modules
    // RecipesModule,
    // ShoppingListModule,
    // AuthModule,
    SharedModule,
    CoreModule,
  ],
  // all services we want to provide
  // we can also provide them within the service using { providedIn: 'root' }
  // providers: [
  // ],
  // which component is available for this module
  bootstrap: [AppComponent],
  // providers: [LoggingService]
})
export class AppModule {}
