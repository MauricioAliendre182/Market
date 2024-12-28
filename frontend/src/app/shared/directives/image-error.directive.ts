import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appImageError]'
})
export class ImageErrorDirective {

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
