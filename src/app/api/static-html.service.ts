import {Injectable, SecurityContext} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DomSanitizer} from '@angular/platform-browser';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {BaseApi} from './base-api';

@Injectable({
  providedIn: 'root'
})
export class StaticHtmlService extends BaseApi {

  constructor(public http: HttpClient,
              private domSanitizer: DomSanitizer) {
    super(http);
  }

  getStaticHTML(url: string, isTrusted: boolean): Observable<string> {
    return this.get(url, {
      responseType: 'text'
    })
      .pipe(
        map(response => this.mapStaticHtml(response, isTrusted))
      );
  }

  private mapStaticHtml(htmlString: string, isTrusted: boolean): string {
    return isTrusted ?
      htmlString :
      // htmlString;
      this.domSanitizer.sanitize(SecurityContext.HTML, htmlString);
  }
}
