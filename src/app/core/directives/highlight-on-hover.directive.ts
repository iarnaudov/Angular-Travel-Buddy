import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightOnHover]'
})

export class HighlightOnHoverDirective {
  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener('mouseover') clickHandler() {
    this.highlight("#246651e3");
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight("transparent");
  }
  
  private highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
