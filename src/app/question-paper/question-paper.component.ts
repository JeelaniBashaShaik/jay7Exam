import { Component, OnInit,Inject } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import { AuthService } from './../auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { ExamService } from './../exam.service' ;
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  private sub: any;

  constructor(private db: AngularFireDatabase,public snackBar: MatSnackBar,public afAuth:AngularFireAuth,private _examService:ExamService,public dialog: MatDialog,private route: ActivatedRoute) { 
  }
  userEmail:string;
  userKey:string;
  answersPath:any;
  questions=[];
  selectedQuestion:any;
  answerKeyMap = new Map();
  totalQuestions:number=0;
  progress:number;
  result = {};
  questionPaper:string;

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '400px',
      //data: { correctCount:'asfas', animal: 'asdfg' }
      data: this.result
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }


  ngOnInit() {
  //  this.questions.subscribe(data=>data.map(x=>this.totalQuestions++));
  this.sub = this.route.params.subscribe(params => {
    console.log(params['id'],"id"); 
    this.questionPaper = params['id'];

    this._examService.fetchAllQuestions(this.questionPaper).subscribe(data=>{
      // console.log(data);
       let tempData = data;
       tempData.map(row=>{
         row['options'] = [row['option1'],row['option2'],row['option3'],row['option4']];
         row['status'] = "unanswered";
         row['selectedOption'] = null;
         this.totalQuestions++;
       })
       this.questions = [...tempData];
       this.selectedQuestion = this.questions[0];
       console.log(this.questions);
     });

 });

    
    

  }

  selectQuestion(question){
   // console.log(question);
    this.selectedQuestion = question;
  }

  update(option,questionNumber){
  this.resultSet.add(questionNumber);
    this.progress = Math.round((this.resultSet.size/this.totalQuestions) * 100);
    console.log(this.progress);
  }
resultToSave = [];
resultSet = new Set();
  saveOption(question){
    if(this.selectedQuestion.selectedOption == null){
      this.snackBar.open('you are skipping this question without answering', '', {
        duration: 2000
      });
      this.selectedQuestion.status = 'skipped';
    }else{
      this.selectedQuestion.status = 'answered';
      this.update(this.selectedQuestion.selectedOption,this.selectedQuestion.questionId);
    }
    //console.log(this.selectedQuestion);
   }

   reviewOption(question){
    //console.log(question);
    console.log(this.selectedQuestion);
    if(this.selectedQuestion.selectedOption == null){
      this.snackBar.open('you are skipping this question without answering', '', {
        duration: 2000
      });
      this.selectedQuestion.status = 'skipped';
    }else{
      this.selectedQuestion.status = 'review';
      this.update(this.selectedQuestion.selectedOption,this.selectedQuestion.questionId);
    }
    
   }

   clearResponse(question){
    this.selectedQuestion.selectedOption = null;
    this.selectedQuestion.status='unanswered';
    /* this.resultToSave = this.resultToSave.filter(row=>{
      console.log(row['questionId'],this.selectedQuestion['questionId']);
      row['questionId'] == this.selectedQuestion['questionId'];
    }) */
    this.resultSet.delete(this.selectedQuestion.questionId);
    this.progress = Math.round((this.resultSet.size/this.totalQuestions) * 100);
   }

  /*  previous(question){
     this.selectedQuestion = this.questions.map((data,index)=>{
       if(this.selectedQuestion === data){
         return this.selectedQuestion=data[index-1];
       }
     })
   } */

   submit(){
     this.resultToSave = [];
     this.questions.map(question=>{
       let x = {questionId:question.questionId,answer:question.selectedOption};
       this.resultToSave = [...this.resultToSave,x];
     })
     console.log(this.questionPaper,"questionPaper");
     this._examService.validateResult(this.resultToSave,this.questionPaper).subscribe(data=>{
       console.log(data);
       this.result = data;
       this.openDialog();
     })
   }
}


@Component({
  selector: 'dialog-overview-example-dialog',
  template:  `
  <h2 mat-dialog-title>Result</h2>
  <hr/>
  <mat-dialog-content >
    <p>Correct Count : <span style="color:green">{{data.correctCount}}</span>,</p>
    <p>Wrong Count   :<span style="color:red">{{data.wrongCount}}</span>,</p>
    <p>Skipped Count : <span style="color:black">{{data.skippedCount}}</span></p>
  </mat-dialog-content>
  
  <mat-dialog-actions>
      <button style="float:right" class="mat-raised-button"(click)="close()">Close</button>
  </mat-dialog-actions>`,
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    //this.dialogRef.close();
  }

  close(){
    this.dialogRef.close();
    this.router.navigateByUrl('/exams');
    
  }

  save(){
    this.dialogRef.close();
  }

}