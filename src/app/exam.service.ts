import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
@Injectable()
export class ExamService {

  constructor(private _http:HttpClient) { }
  baseUrl:string = 'http://localhost:8080/';

  fetchAllQuestions(questionPaper:string):Observable<any>{
    return this._http.get(this.baseUrl+'getQuestions?questionPaper='+questionPaper);
  }

  validateResult(result,questionPaper):Observable<any>{
    console.log(result);
   return this._http.post(this.baseUrl+'validateResult?questionPaper='+questionPaper,result,{headers:this.appendHeader()});
  }

  appendHeader(){
    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return headers;
  }

  fetchExams(){
    return this._http.get(this.baseUrl+'getExams');
  }
}