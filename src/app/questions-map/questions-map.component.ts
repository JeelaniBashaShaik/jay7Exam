import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-questions-map',
  templateUrl: './questions-map.component.html',
  styleUrls: ['./questions-map.component.css']
})
export class QuestionsMapComponent implements OnInit {

  @Input() questions;
  @Output() selected = new EventEmitter();
  
  selectedQuestion:any;
  constructor(private db: AngularFireDatabase) { 
   // this.questions = this.db.list('questions').valueChanges();
   
  }

  ngOnInit() {
    
  }

  selectQuestion(question){
//console.log(question);
//this.selectedQuestion = question;
this.selected.emit(question);
  }

}
