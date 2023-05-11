import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
  // services do not need to be exported
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]

})
export class CoreModule {}