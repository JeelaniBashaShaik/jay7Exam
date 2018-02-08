import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import {MatSnackBar} from '@angular/material';
import { AuthService } from './../auth-service';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-question-paper',
  templateUrl: './question-paper.component.html',
  styleUrls: ['./question-paper.component.css']
})
export class QuestionPaperComponent implements OnInit {

  constructor(private db: AngularFireDatabase,public snackBar: MatSnackBar,public afAuth:AngularFireAuth) { 
    this.questions = this.db.list('questions').valueChanges();
    this.questions.subscribe(data=>{this.selectedQuestion=data[0];
    console.log(data)});
    let x = afAuth.authState;
    x.subscribe(data=>{
      this.userEmail=data.email;
      var query = this.db.database.ref('/users_List').orderByChild("email").equalTo(this.userEmail).once("value", (snapshot)=> {
        var userData = snapshot.val(); 
         // //console.log(userData);
          this.userKey = Object.keys(userData)[0];
       ////console.log(Object.keys(userData));
       this.answersPath = this.db.list('/users_List/'+Object.keys(userData)+'/answers');
      
       })
    });
 /*    var query = this.db.database.ref('/users_List').orderByChild("email").equalTo(this.userEmail).once("value", (snapshot)=> {
      var userData = snapshot.val(); 
       // //console.log(userData);
        this.userKey = Object.keys(userData)[0];
     ////console.log(Object.keys(userData));
     this.answersPath = this.db.list('/users_List/'+Object.keys(userData)+'/answers');
    
     }) */
  }
  userEmail:string;
  userKey:string;
  answersPath:any;
  questions:Observable<any>;
  selectedQuestion:any;
  answerKeyMap = new Map();
  totalQuestions:number=0;
  progress:number;
  ngOnInit() {
    this.questions.subscribe(data=>data.map(x=>this.totalQuestions++));
   // this.selectedQuestion = this.questions[0];
    //console.log(this.selectedQuestion);
   
  }

  selectQuestion(question){
   // console.log(question);
    this.selectedQuestion = question;
  }

  questionSelected(e){
  //  console.log(e);
    this.selectedQuestion = e;
    console.log(this.selectedQuestion);
  }

  selectedOption(e){
    this.answerKeyMap.set(e.questionNumber,e.selectedOption);
    console.log(this.answerKeyMap);
  }

  update(option,questionNumber){
    let entry = [questionNumber,option]
    this.answerKeyMap.set(questionNumber,option);
    console.log(this.answerKeyMap);
    //console.log(this.answerKeyMap.size);
    //console.log(this.totalQuestions);
    this.progress = Math.round((this.answerKeyMap.size/this.totalQuestions) * 100);
    console.log(this.progress);
  }

  saveOption(question){
    //console.log(question);
    console.log(this.selectedQuestion);
    if((this.selectedQuestion.selectedOption == null) || (this.selectedQuestion.selectedOption == ' ')){
      this.snackBar.open('you are skipping this question without answering', '', {
        duration: 1000
      });
      this.selectedQuestion.status = 'skipped';
    }else{
      this.selectedQuestion.status = 'answered';
      this.update(this.selectedQuestion.selectedOption,this.selectedQuestion.questionNumber);
    }
    
   }

   reviewOption(question){
    //console.log(question);
    console.log(this.selectedQuestion);
    if((this.selectedQuestion.selectedOption == null) || (this.selectedQuestion.selectedOption == ' ')){
      this.snackBar.open('you are skipping this question without answering', '', {
        duration: 1000
      });
      this.selectedQuestion.status = 'skipped';
    }else{
      this.selectedQuestion.status = 'review';
      this.update(this.selectedQuestion.selectedOption,this.selectedQuestion.questionNumber);
    }
    
   }

   clearResponse(question){
    this.selectedQuestion.selectedOption = null;
    this.selectedQuestion.status='unanswered';
    if(this.answerKeyMap.has(this.selectedQuestion.questionNumber)){
      this.answerKeyMap.delete(this.selectedQuestion.questionNumber);
    }
    this.progress = Math.round((this.answerKeyMap.size/this.totalQuestions) * 100);
    console.log(this.progress);
    console.log(this.answerKeyMap);
   }

  /*  previous(question){
     this.selectedQuestion = this.questions.map((data,index)=>{
       if(this.selectedQuestion === data){
         return this.selectedQuestion=data[index-1];
       }
     })
   } */

   submit(){
     //console.log(this.answerKeyMap);
     let y = {};
     this.answerKeyMap.forEach((v,k)=>{
      y[k]=v;
     })
     let x = {questionPaperId:'abc123',answers:y};
     //console.log(y);
     console.log(this.userKey);
     this.answersPath.push(y).then(data=>console.log(data)).catch(err=>console.log(err));
     
   }
}
