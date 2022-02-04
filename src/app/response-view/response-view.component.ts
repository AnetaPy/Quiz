import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-response-view',
  templateUrl: './response-view.component.html',
  styleUrls: ['./response-view.component.sass'],
})
export class ResponseViewComponent implements OnInit {
  message: string = '';
  public answers: any = [];
  public allQuestions: any = [];
  public link: string = '';
  public userSelectionOne: string = '';
  public userSelectionTwo: string = '';
  public userSelectionThree: string = '';
  public userSelectionFour: string = '';
  public userSelectionFive: string = '';

  constructor(
    private questionService: QuestionsService,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.getAllQuetsions();
    this.data.currentMessage.subscribe((msg) => (this.message = msg));
    this.answers = this.message.split(',');
    this.userSelectionOne = this.answers[3];
    this.userSelectionTwo = this.answers[4];
    this.userSelectionThree = this.answers[5];
    this.userSelectionFour = this.answers[6];
    this.userSelectionFive = this.answers[7];
  }
  getAllQuetsions() {
    this.questionService.getQuestionsJson().subscribe((res) => {
      this.allQuestions = res;
    });
  }
}
