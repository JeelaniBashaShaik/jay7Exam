import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth,private db: AngularFireDatabase,private http:HttpClient) {
    this.user = firebaseAuth.authState;
    this.usersList = this.db.database.ref('/users_List');
  }

/*   signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  } */

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });
  }
  usersList:any;
  email:string;
  login1(){
      this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(data=>{
        console.log(data,'logged');
        let usersList = this.db.list('/users_List');
       
     var query = this.db.database.ref('/users_List').orderByChild("email").equalTo(data.user.email).once("value", (snapshot)=> {
     var userData = snapshot.val();
        if (userData){
         console.log('user already exists');
        }else{
        console.log('user doesnt exits');
          let user = {name:data.user.displayName,email:data.user.email,image:data.user.photoURL};
          this.usersList.push(user);
          //this.listOfUsers.push(this.jay7User.userName);
        }
      // console.log(userData);
        this.email = data.user.email;
        console.log('email',this.email);
      return true;
    })
      
      
      
      }).catch(err=>{console.log('error',err);return false;});
  }

  login2(){
      this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider()).then(data=>console.log(data)).catch(err=>console.log(err));
  }
  logout() {
    this.firebaseAuth
      .auth
      .signOut();
  }

  saveAnswers(userKey,answerKeyMap){
    let body;
    this.http.post('https://us-central1-jay7exam.cloudfunctions.net/insertIntoDB?userKey='+userKey,body).subscribe(data=>console.log(data));
  }
}