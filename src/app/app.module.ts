import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { AuthService } from './auth-service';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsMapComponent } from './questions-map/questions-map.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { NgxEchartsModule } from 'ngx-echarts';
import { ExamService } from './exam.service';
import { DialogOverviewExampleDialog} from './question-paper/question-paper.component';
import { ExamsListComponent } from './exams-list/exams-list.component';


@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionsMapComponent,
    QuestionPaperComponent,
    DialogOverviewExampleDialog,
    ExamsListComponent
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,NgxEchartsModule
  ],
  providers: [AuthService,AngularFireDatabase, ExamService],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
  exports:[QuestionsComponent],
  entryComponents: [DialogOverviewExampleDialog]
})
export class AppModule { }
