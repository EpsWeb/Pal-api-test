import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

import {Subscription} from 'rxjs';
import {StaticHtmlService} from './static-html.service';

// import * from '../../../scripts/body.js';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit, OnDestroy {
  @ViewChild('myDiv') myDiv: ElementRef;

  // innerHtml: SafeHtml;

  constructor(
    private staticHtmlService: StaticHtmlService, private domSanitizer: DomSanitizer,
  ) {
  }

  userId = 'danielepel@pal-es.com';
  subscription: Subscription;
  isLoaded = false;


  ngOnInit(): void {
    this.insertStaticView();
  }

  private insertStaticView(): void {
    this.subscription = this.staticHtmlService.getStaticHTML(`user/${this.userId}/api-file`, true)
      .subscribe(response => {
        this.replaceHtml(response);
      });
  }

  private replaceHtml(innerHTMLL: string): void {
    try {
      console.log('function replaceHtml');
      this.isLoaded = true;
      // this.innerHtml = this.domSanitizer.bypassSecurityTrustHtml(innerHTMLL);

      const parser = new DOMParser();
      const doc = parser.parseFromString(innerHTMLL, 'text/html');
      const scripts = doc.querySelectorAll('script');
      const el = document.querySelector('#redoc');
      el.innerHTML = innerHTMLL;

      scripts.forEach(scr => {
        // console.log('script: ', scr.text);
        if (scr.text.slice(0, 10).includes('ReD')) {
          // scr.src = '../../../scripts/head.js';
          // scr.async = true;
          // scr.charset = 'utf-8';
          // scr.type = 'text/javascript';
          el.addEventListener('onload', () => document.head.appendChild(scr));
        } else {
          // scr.src = '../../../scripts/body.js';
          // scr.async = true;
          // scr.charset = 'utf-8';
          // scr.type = 'text/javascript';
          el.addEventListener('onload', () => document.body.appendChild(scr));
          // document.body.appendChild(scr);
        }
      });

      // document.querySelector('#redoc').innerHTML = innerHTML;
      // this.myDiv.nativeElement.innerHTML = innerHTML;
      // this.innerHtml = innerHTMLL;
    } catch (e) {
      console.log('Error: ', e);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
