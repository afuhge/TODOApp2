import {
  Component,
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
} from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public componentRef: ComponentRef<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) { }

  private appendDialogComponentToBody(component: any): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    this.componentRef = componentRef;
  }

  private removeDialogComponentFromBody(): void {
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
  }

  public showModal(component: any): void {
    this.appendDialogComponentToBody(component);
  }

  public closeModal(): void {
    this.removeDialogComponentFromBody();
  }
}
