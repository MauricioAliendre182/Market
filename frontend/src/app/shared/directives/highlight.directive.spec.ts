import { ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

describe('HighlightDirective', () => {
  let mockElement: ElementRef;
  let directive: HighlightDirective;

  beforeEach(() => {
    const div = document.createElement('div');
    mockElement = new ElementRef(div); // ✅ Mock ElementRef
    directive = new HighlightDirective(mockElement);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should change background color to red on mouse enter', () => {
    directive.onMouseEnter();
    expect(mockElement.nativeElement.style.backgroundColor).toBe('red');
  });

  it('should remove background color on mouse leave', () => {
    directive.onMouseEnter(); // Set color first
    directive.onMouseLeave(); // Now remove it
    expect(mockElement.nativeElement.style.backgroundColor).toBe('');
  });
});
