import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Toaster } from "src/app/common/toaster";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: Toaster) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return next.handle(req)
            .pipe(catchError((err: HttpErrorResponse) => {
                if (err instanceof HttpErrorResponse) {
                    switch (err.status) {
                        case 401:
                            this.toastr.showError(err.error.message);
                            break;
                        case 400:
                            const errors = err['error'].errors;
                            for (let key of Object.keys(errors)) {
                                this.toastr.showError(errors[key]);
                            }
                            break;
                        case 500:
                            this.toastr.showError(err.error.message);
                            break;
                    }
                }

                return throwError(err.error);
            }));
    }
}
