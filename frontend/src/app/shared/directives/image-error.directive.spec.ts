import { ElementRef } from '@angular/core';
import { ImageErrorDirective } from './image-error.directive';

describe('ImageErrorDirective', () => {
  let mockElement: ElementRef<HTMLImageElement>;
  let directive: ImageErrorDirective;

  beforeEach(() => {
    const img = document.createElement('img');
    mockElement = new ElementRef(img); // ✅ Mock ElementRef
    directive = new ImageErrorDirective(mockElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should set a default image on error', () => {
    directive.handleError();
    expect(mockElement.nativeElement.src).toBe('https://www.sam-manipulados.com/wp-content/uploads/2014/01/default_image_01.png');
  });
});
