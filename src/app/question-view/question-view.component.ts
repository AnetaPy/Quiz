import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QuestionsService } from '../service/questions.service';
import { style } from '@angular/animations';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-question-view',
  templateUrl: './question-view.component.html',
  styleUrls: ['./question-view.component.sass'],
})
export class QuestionViewComponent implements OnInit {
  public name: string = '';
  public allQuestions: any = [];
  public currentQuestion: number = 0;
  public correctAnswer: number = 0;
  public incorrectAnswer: number = 0;
  public userSelection: any = [];
  constructor(
    private questionService: QuestionsService,
    private data: DataService
  ) {}

  message: string = '';

  ngOnInit(): void {
    this.name = localStorage.getItem('name')!;
    this.getAllQuetsions();
    this.data.currentMessage.subscribe((msg) => (this.message = msg));
  }

  getAllQuetsions() {
    this.questionService.getQuestionsJson().subscribe((res) => {
      this.allQuestions = res;
    });
  }

  nextQuestion() {
    this.currentQuestion++;
  }

  getAnswer(currentQuestionNumber: number, option: any) {
    if (option.correct) {
      this.correctAnswer++;
      this.userSelection[this.currentQuestion] = option.text;
    } else {
      this.incorrectAnswer++;
      this.userSelection[this.currentQuestion] = option.text;
    }
    console.log(this.userSelection);
  }

  sendMessage() {
    this.data.changeMessage(
      this.correctAnswer +
        ',' +
        this.incorrectAnswer +
        ',' +
        this.allQuestions.length +
        ',' +
        this.userSelection
    );
  }
}
