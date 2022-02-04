import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { ResponseViewComponent } from './response-view/response-view.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';
SummaryViewComponent;

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: MainViewComponent },
  { path: 'question', component: QuestionViewComponent },
  { path: 'response', component: ResponseViewComponent },
  { path: 'summary', component: SummaryViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
