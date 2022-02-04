import {
  Directive,
  Input,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[appChangeBg]',
})
export class ChangeBgDirective {
  @Input() isCorrect: Boolean = false;

  constructor(private el: ElementRef, private render: Renderer2) {}
  @HostListener('click') getAnswer() {
    if (this.isCorrect) {
      this.render.setStyle(this.el.nativeElement, 'background', '#56b97c');
    } else {
      this.render.setStyle(this.el.nativeElement, 'background', '#d16363');
    }
  }
}
