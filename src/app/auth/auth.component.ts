import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  private storeSubscription: Subscription;
  private closeSubscription: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSubscription = this.store
      .select('auth')
      .subscribe((authState) => {
        this.isLoading = authState.isLoading;
        this.error = authState.authError;

        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }

    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      // will return 400 error if account exists
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: email,
          password: password,
        })
      );
    }

    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  // rendering our component programmatically
  private showErrorAlert(errorMessage: string) {
    // const alertComponent = new AlertComponent()
    const alertComponentFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    // clear anything we had there before
    hostViewContainerRef.clear();

    //storing our component inside a reference
    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    // adding the necessary data/events into our programmatically created component
    componentRef.instance.message = errorMessage;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
