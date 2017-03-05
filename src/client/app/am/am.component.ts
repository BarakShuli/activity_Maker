import { Component,Renderer, ElementRef, Inject, ComponentRef, ComponentFactoryResolver, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { DOCUMENT} from '@angular/platform-browser';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';
import {widgetComponent} from './am.Widget.component';
declare var $:any;

export interface IWidgetSizeObj {
    width: number;
    height: number;
}

@Component({
  moduleId: module.id,
  selector: 'sd-am',
  templateUrl: 'am.component.html',
  styleUrls: ['am.component.css']
})

export class AmComponent  { 
  public initWidth: number;
  public initHeight: number;
  public gSelectedTop: any;
  public gSelectedLeft: any;
  public gSelectedWidth: any;
  public gSelectedHeight: any;
  readonly minWidthHeightBox: number = 10;
  public indexIdList: any = {};
  public widgetSizeObj: IWidgetSizeObj;
  elementRef: ElementRef;
  @Input() widgetStyle:any;
  @Input() indexId:any;
  @Input() _ref: ComponentRef<any>

  constructor(@Inject (DOCUMENT) private document: Document, @Inject(ElementRef) elementRef: ElementRef, 
              private renderer : Renderer,
              private componentFactoryResolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef){
    this.elementRef = elementRef;
  }

  onMouseDown(e:any){
    $(this.elementRef.nativeElement).find('#grid div').addClass("gSelected gActive");
    this.gSelectedLeft = e.pageX;
    this.gSelectedTop = e.pageY-100;
    this.initHeight = e.pageY;  
    this.initWidth = e.pageX; 
    $(this.document).bind("mousemove", this.openSelector.bind(this));
    $(this.document).bind("mouseup", this.selectElement.bind(this));

  }

  selectElement(e:any){
    $(this.document).unbind("mousemove");
    $(this.document).unbind("mouseup");

    let width = Math.abs(this.initWidth - e.pageX);
    let height = Math.abs(this.initHeight - e.pageY);
    
    if(width > this.minWidthHeightBox && height > this.minWidthHeightBox){
      this.widgetStyle =  
      {
        top: this.gSelectedTop+100, 
        left: this.gSelectedLeft, 
        width: this.gSelectedWidth, 
        height: this.gSelectedHeight     
      };
      this.createNewWidget(); 
    }   
    $(this.elementRef.nativeElement).find('#grid div').removeClass("gActive");
    this.gSelectedWidth = 0;
    this.gSelectedHeight = 0;
  }

  createNewWidget(){
    var newIndexId:number = this.getComponentNewIndexId();
    const factory = this.componentFactoryResolver.resolveComponentFactory(widgetComponent);
    const ref = this.viewContainerRef.createComponent(factory,);
    ref.instance.widgetStyle = this.widgetStyle;
    ref.instance.indexId = newIndexId;
    ref.instance._ref = ref;
    ref.changeDetectorRef.detectChanges();
  }

  getComponentNewIndexId(){
     var currentIndex:number = Object.keys(this.indexIdList).length;
     this.indexIdList[currentIndex] = currentIndex;
     return currentIndex;
  }

  openSelector(e: any){
    let sizeObj: IWidgetSizeObj = this.calculateWidgetSize(e);
    this.gSelectedWidth = sizeObj.width;
    this.gSelectedHeight = sizeObj.height;

    if(e.pageX <= this.initWidth && e.pageY >= this.initHeight){
      this.gSelectedLeft = e.pageX;
    }else if(e.pageY <= this.initHeight && e.pageX >= this.initWidth){
      this.gSelectedTop = e.pageY;
    }else if(e.pageY < this.initHeight && e.pageX < this.initWidth){
      this.gSelectedLeft = e.pageX;
      this.gSelectedTop = e.pageY;
    }

  }

    calculateWidgetSize(e:any) : IWidgetSizeObj{
    let width = Math.abs(this.initWidth - e.pageX);
    let height = Math.abs(this.initHeight - e.pageY);

    return {
      width: width,
      height: height
    }

  }

}


