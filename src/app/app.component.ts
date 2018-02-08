import { Component } from '@angular/core';
import { AuthService } from './auth-service';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { QuestionModel } from './shared/questions';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  items: Observable<any[]>;
  questionsRef:AngularFireList<any>;
  constructor(public authService: AuthService,db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
    this.questionsRef = db.list('questions');
  }
  
    login1(){
      let x = this.authService.login1();
     // this.email = this.password = '';
     if(x){

     }    
    }
  
    logout() {
      this.authService.logout();
    }


    add(){
      let x:QuestionModel = new QuestionModel();
      x.question = 'what is age';
      x.questionNumber = 2;
      x.optionType = 'singleSelect';
      x.options = ['15','25','6'];
      this.questionsRef.push(x).then(data=>console.log(data));
    }
}
