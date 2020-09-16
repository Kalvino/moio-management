import { Directive, ElementRef, Attribute, OnInit } from '@angular/core';

/**
 * font size directive
 * @deprecated (cvb) pretty sure we don not need this
 */
@Directive({selector: '[fontSize]'})
export class FontSizeDirective implements OnInit {
  constructor(@Attribute('fontSize') public fontSize: string, private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.fontSize = this.fontSize;
  }
}
