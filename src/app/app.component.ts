import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from '@angular/core';
import {ApiComponent} from './api/api.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  // @ViewChild('apiContainer', {read: ViewContainerRef}) container;
  title = 'Test';
  // componentRef: ComponentRef<any>;
  //
  // constructor(private resolver: ComponentFactoryResolver) {
  // }
  //
  // createComponent(): void {
  //   this.container.clear();
  //   const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(ApiComponent);
  //   this.componentRef = this.container.createComponent(factory);
  // }
  //
  ngOnDestroy() {
  //   this.componentRef.destroy();
  }
}
