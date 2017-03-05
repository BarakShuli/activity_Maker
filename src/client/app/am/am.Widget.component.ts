import { Component,Renderer, ElementRef, Inject, OnInit, Input, Output, ViewEncapsulation, EventEmitter, ComponentRef} from '@angular/core';
import { DOCUMENT} from '@angular/platform-browser';
import {BrowserDomAdapter} from '@angular/platform-browser/src/browser/browser_adapter';

declare var $:any;

export interface IWidgetStyleObj {
    top: number;
    left: number;
    width: number;
    height: number;
}

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-widget',
  templateUrl: 'am.Widget.component.html',
  styleUrls: ['am.Widget.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class widgetComponent implements OnInit, IWidgetStyleObj  { 
  public initWidth: number;
  public initHeight: number;
  public maxWidth: number;
  public maxHeight: number;
  public isGHostVisible: boolean;
  public widgetStyleObjectTop:string;
  public widgetStyleObjectLeft:string;
  public widgetStyleObjectWidth:string;
  public widgetStyleObjectHeight:string;
  public top:number;    // IWidgetStyleObj implemention
  public left:number;   // IWidgetStyleObj implemention
  public width:number;  // IWidgetStyleObj implemention
  public height:number; // IWidgetStyleObj implemention

  elementRef: ElementRef;
  @Input() widgetStyle: IWidgetStyleObj;
  @Input() indexId: number;
  @Input() _ref: ComponentRef<any>;
  @Output() removeComponentByIndexId: EventEmitter<string> = new EventEmitter<string>()
  
  constructor(@Inject (DOCUMENT) private document: Document, @Inject(ElementRef) elementRef: ElementRef,
              private renderer : Renderer){
    this.elementRef = elementRef;
  }


  ngOnInit() {
    this.widgetStyleObjectTop = this.widgetStyle.top.toString()+'px';
    this.widgetStyleObjectLeft = this.widgetStyle.left.toString()+'px';
    this.widgetStyleObjectWidth = this.widgetStyle.width.toString()+'px';
    this.widgetStyleObjectHeight = this.widgetStyle.height.toString()+'px';
    $(this.elementRef.nativeElement).find(".draggable").draggable();
    $(this.elementRef.nativeElement).find(".draggable").resizable();
  }

  setSelectedWidget(event:any){
    var target = event.target || event.srcElement || event.currentTarget;
    $(document).find(".activeBox").removeClass("activeBox").find(".widgetBoxMenu").hide();
    $(target).addClass("activeBox").find(".widgetBoxMenu").show();
  }

  removeSelectedComponent(){
    this._ref.destroy();
  }
}


