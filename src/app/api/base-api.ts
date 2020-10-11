import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class BaseApi {
    constructor(public http: HttpClient) {
    }

    baseApi = 'https://dev.pal-es.com/api/v1/';
    // baseApi = environment.baseApi;

    private handleError(error: HttpErrorResponse): any {
        return throwError(error);
    }

    get(text: string, headers?: any): Observable<any> {
        return this.http.get(this.baseApi + text, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    post(text: string, obj: any, headers?: any): Observable<any> {
        return this.http.post(this.baseApi + text, obj, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    put(text: string, obj: any, headers?: any): Observable<any> {
        return this.http.put(this.baseApi + text, obj, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete(text: string, headers?: any): Observable<any> {
        return this.http.delete(this.baseApi + text, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteBody(text: string, body: any, headers?: any): Observable<any> {
        return this.http.request('delete', this.baseApi + text, {headers, body})
            .pipe(
                catchError(this.handleError)
            );
    }

    getUserImage(id: string, userToken: string): Promise<string> {
        return fetch(`${this.baseApi}app-user/${id}/image`, {
            method: 'GET',
            headers: {'X-Access-Token': userToken}
        })
            .then(response => response.blob())
            .then(blob => {
                return URL.createObjectURL(blob);
            });
    }

    getPlaceControlImage(placeId: string, userToken: string): Promise<string> {
        return fetch(`${this.baseApi}place/${placeId}/image/controlTabBG`, {
            method: 'GET',
            headers: {'X-Access-Token': userToken}
        })
            .then(response => response.blob())
            .then(blob => {
                return URL.createObjectURL(blob);
            });
    }
}
