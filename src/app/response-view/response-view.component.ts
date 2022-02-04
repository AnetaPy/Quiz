import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../service/questions.service';

@Component({
  selector: 'app-response-view',
  templateUrl: './response-view.component.html',
  styleUrls: ['./response-view.component.sass'],
})
export class ResponseViewComponent implements OnInit {
  public allQuestions: any = [];
  public link: string = '';

  constructor(private questionService: QuestionsService) {}

  ngOnInit(): void {
    this.getAllQuetsions();
  }
  getAllQuetsions() {
    this.questionService.getQuestionsJson().subscribe((res) => {
      this.allQuestions = res;
    });
  }

  displayCorrectQuestion() {
    if ((this.allQuestions.options.correct = true)) {
      console.log('ok');
    }
  }
}
