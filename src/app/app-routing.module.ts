import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsMapComponent } from './questions-map/questions-map.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component'
import { EchartsComponent } from './echarts/echarts.component';
 
const appRoutes: Routes = [
  /* { path: '', component: AppComponent }, */
  { path:'question', component: QuestionsComponent },
  { path:'questionsMap',component:QuestionsMapComponent},
  { path:'questionPaper',component:QuestionPaperComponent},
  { path:'charts',component:EchartsComponent}
  

];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}