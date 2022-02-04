import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-summary-view',
  templateUrl: './summary-view.component.html',
  styleUrls: ['./summary-view.component.sass'],
})
export class SummaryViewComponent implements OnInit {
  message: string = '';
  public answers: any = [];
  public correctAnswer: number = 0;
  public incorrectAnswer: number = 0;
  public allAnswer: number = 0;
  public visible: number = 0;
  public userSelectionOne: string = '';
  public userSelectionTwo: string = '';
  public userSelectionThree: string = '';
  public userSelectionFour: string = '';
  public userSelectionFive: string = '';

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.data.currentMessage.subscribe((msg) => (this.message = msg));
    this.answers = this.message.split(',');
    console.log(this.message);
    console.log(this.answers);
    this.correctAnswer = Number(this.answers[0]);
    this.incorrectAnswer = Number(this.answers[1]);
    this.allAnswer = Number(this.answers[2]);
    this.userSelectionOne = this.answers[3];
    this.userSelectionTwo = this.answers[4];
    this.userSelectionThree = this.answers[5];
    this.userSelectionFour = this.answers[6];
    this.userSelectionFive = this.answers[7];
    this.visible = this.correctAnswer / this.allAnswer;

    console.log(this.userSelectionOne);
    console.log(this.userSelectionTwo);
    console.log(this.userSelectionThree);
    console.log(this.userSelectionFour);
    console.log(this.userSelectionFive);
  }
}
