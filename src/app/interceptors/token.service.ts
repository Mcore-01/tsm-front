import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpEvent, HttpHandler, HttpRequest, HttpResponse} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor {

  constructor(private route: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    if (token && userID){
      const reqWithJWT = req.clone({
        headers: req.headers.set("Authorization",
            "Bearer " + token).set("userID", userID)
      })
      return next.handle(reqWithJWT).pipe(catchError(error => {
        if (!!error.status && error.status === 401) {
          if (this.route.url == '/')
            return throwError(() => error);
          this.route.navigate(['/enter/auth']).then();
          return throwError(()=> error);
        }
        return throwError(()=> error);
      }));
    }
    else{
      if (this.route.url == '/enter/reg' || this.route.url == '/'){
        return next.handle(req);
      }
      this.route.navigate(['/enter/auth']).then();
      return next.handle(req);
    }
  }
}
