import { Directive, HostListener, Inject } from '@angular/core';
import { DropdownLinkDirective } from './dropdown-link.directive';

/**
 * DropDownToggle directive
 * @deprecated (cvb) Not sure if we need it.
 */
@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownAnchorDirective {

  protected navlink: DropdownLinkDirective;

  constructor(@Inject(DropdownLinkDirective) navlink: DropdownLinkDirective) {
    this.navlink = navlink;
  }

  @HostListener('click', ['$event'])
  onClick(e: any) {
    this.navlink.toggle();
  }
}
