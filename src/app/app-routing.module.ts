import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { AppComponent } from './app.component';
import { QuestionPaperComponent } from './question-paper/question-paper.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
 
const appRoutes: Routes = [
  { path: '', component: ExamsListComponent },
  { path:'questionPaper/:id',component:QuestionPaperComponent},
  { path:'exams', component:ExamsListComponent }
  
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