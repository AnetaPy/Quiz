import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.sass'],
})
export class MainViewComponent implements OnInit {
  // param = { value: 'world' };
  @ViewChild('name') nameKey!: ElementRef;
  constructor(translate: TranslateService) {
    translate.setDefaultLang('pl');
    translate.use('pl');
  }

  ngOnInit(): void {}
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
