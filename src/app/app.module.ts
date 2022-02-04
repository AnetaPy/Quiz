import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainViewComponent } from './main-view/main-view.component';
import { QuestionViewComponent } from './question-view/question-view.component';
import { SummaryViewComponent } from './summary-view/summary-view.component';
import { ResponseViewComponent } from './response-view/response-view.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ChangeBgDirective } from './change-bg.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainViewComponent,
    QuestionViewComponent,
    SummaryViewComponent,
    ResponseViewComponent,
    HeaderComponent,
    ChangeBgDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
