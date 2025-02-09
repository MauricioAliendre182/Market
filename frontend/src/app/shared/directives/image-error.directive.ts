import { Directive, HostListener, ElementRef } from '@angular/core';

// ImageErrorDirective listens for the error event on an <img> element and replaces the src with a fallback image.
@Directive({
  selector: '[appImageError]'
})
export class ImageErrorDirective {
  //@HostListener is a decorator in Angular that allows a directive to listen to DOM events on the element it is applied to.
  // This means you can react to user interactions (like clicks, mouse events, key presses, etc.)
  // without manually adding event listeners in the component.
  @HostListener( 'error' )
  handleError (): void {
    this.element.nativeElement.src = "https://www.sam-manipulados.com/wp-content/uploads/2014/01/default_image_01.png";
  }

  constructor(
    private element: ElementRef<HTMLImageElement>
  ) {
    console.log( element );
  }

}
