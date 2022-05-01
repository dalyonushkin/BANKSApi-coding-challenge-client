import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class TransfersInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(
        httpRequest: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const headerReq = httpRequest.clone({
            headers: httpRequest.headers.set('Accept', 'application/json'),
        });
        if (headerReq.responseType === 'json') {
            // If the expected response type is JSON then handle it here.
            return this.transfromTransferRecord(headerReq, next);
        } else {
            return next.handle(httpRequest);
        }

        /*return next.handle(authReq).pipe(
            tap(
                (event) => {
                    if (event instanceof HttpResponse) { console.log('Server response'); }
                },
                (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) { console.log('Unauthorized'); }
                    }
                }
            )
        );*/
    }
    transfromTransferRecord(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Override the responseType to disable the default JSON parsing.
        httpRequest = httpRequest.clone({ responseType: 'text' });
        // Handle the response using the custom parser.
        return next.handle(httpRequest).pipe(map(event => this.parseJsonTransferRecordResponse(event)));
        //hrow new Error('Method not implemented.');
    }

    dateReviver(key: string, value: any) {
        if (key === 'date') { return new Date(Date.parse(value));}
        return value;
    }
    parseJsonTransferRecord(text: string): any {
        return JSON.parse(text, this.dateReviver);
    }
    private parseJsonTransferRecordResponse(event: HttpEvent<any>) {
        if (event instanceof HttpResponse && typeof event.body === 'string') {
            return event.clone({ body: this.parseJsonTransferRecord(event.body) });
        } else {
            return event;
        }
    }


}
