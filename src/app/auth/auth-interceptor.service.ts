import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';

// http interceptor that will add the auth token to all outgoing requests
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      // take will only get one observable value (whatever it is at that point in time)
      // and then automatically unsubscribe afterwards
      take(1),
      /// only return the auth object from this slice of the store
      map(authState => {
        return authState.user
      }),
      // exhaustMap will chain an observable to the previous, and return only one observable
      exhaustMap((user) => {
        // if user does not exist, return original request that creates token
        if(!user) {
          return next.handle(req)
        }
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
