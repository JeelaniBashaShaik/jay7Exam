import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {


  @Input() question;
  @Output() selected = new EventEmitter();
  //selectedOption:any;
  questions:Observable<any>;
  answerKeyMap = new Map();
  selectedOption:any;
  //question:any;
  constructor(private db: AngularFireDatabase) { 
    //this.questions = this.db.list('questions').valueChanges();
  }

  ngOnInit() {
    
  }

  update(option,questionNumber){
    let entry = [questionNumber,option]
    this.answerKeyMap.set(questionNumber,option);
    console.log(this.answerKeyMap);
  }

  saveOption(question){
   this.question.status = 'answered';
  // this.question.selectedOption=this.selectedOption;
   //this.update(question.selectedOption,question.questionNumber);
   console.log(this.question);
    this.selected.emit(this.question);
  }
  reviewOption(question){
    this.question.status = 'review';
    this.question.selectedOption=this.selectedOption;
    this.selected.emit(this.question);
  }


}
