import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.sass'],
})
export class MainViewComponent implements OnInit {
  @ViewChild('name') nameKey!: ElementRef;
  constructor() {}

  ngOnInit(): void {}
  startQuiz() {
    localStorage.setItem('name', this.nameKey.nativeElement.value);
  }
}
