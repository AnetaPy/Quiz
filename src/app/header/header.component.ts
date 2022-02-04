import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  logoPath: string;
  plPath: string;
  enPath: string;
  constructor() {
    this.logoPath = '../../assets/pic/logo.png';
    this.plPath = '../../assets/pic/pl.png';
    this.enPath = '../../assets/pic/en.png';
  }

  ngOnInit(): void {}
}
