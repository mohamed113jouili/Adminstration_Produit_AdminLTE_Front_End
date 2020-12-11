import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { SubErrorResponse } from '../models/sub-errorr-response';
import { ErrorService } from '../services/error.service';
@Injectable({ providedIn: 'root' })
export class HttpErrorInterceptor implements HttpInterceptor {
    sub: SubErrorResponse = {};
    serror: string = "{}";
    constructor(public  errorService: ErrorService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error

                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        this.serror = JSON.stringify(error.error);

                        this.errorService.subjectIsError.next(true);

                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
                    }
                    window.alert(this.serror);
                    return throwError(errorMessage);
                })
            )
    }



    
}