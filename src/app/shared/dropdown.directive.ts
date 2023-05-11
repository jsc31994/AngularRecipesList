import { Directive, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // we first bind to the attribute, then assign a variable with a 
  // boolean value for that attribute so we can modify within this file
  @HostBinding('class.open') isOpen = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}