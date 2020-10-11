import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2MDI0OTE2NjQ4NzIsImlkIjoiZGFuaWVsZXBlbEBwYWwtZXMuY29tIiwiY2lkIjoiMjk0NDE4MmMwZDMyNzg0NDZlOGQ5Mjk4MjgzOTljMzM3N2YzM2E3ZDY2NzQ4YmQ5ZDY5MzNhNzg3ZmMzZThjODljNmNlZDI2YjQ0NjJlN2E2YTRmNDg0ZGUxYmFkMDg5YjdkMWIzZjA4NjM5ZTg5OTY0ZDU0NGY5NTYwNTMxNWUwNTliZmFjZjdkMTljZWJlNzdjYmVjNTQ0MTY5MDg5NiIsImppdCI6IjMzMjI3ZGVmLTlhYmItNDllZS1hMmJiLWM5ZTQ4N2FhZTk1OCIsImoiOjEsImEiOjF9._2eIw55csqWj0es1w_pDzPkW1LpKfTUIlQfm19MjiUngtKVUbCd7bS611sHJqdfTF6kIcIQVfi_pNeARfknLEw';
    const clonedRequest = req.clone({
      headers: req.headers.set('X-Access-Token', token)
    });
    return next.handle(clonedRequest);
  }
}
