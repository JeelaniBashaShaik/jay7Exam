import { Component, OnInit } from '@angular/core';
import { ExamService } from '../exam.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html',
  styleUrls: ['./exams-list.component.css']
})
export class ExamsListComponent implements OnInit {

  exams:any;
  constructor(private _examService:ExamService,private router:Router) { }

  ngOnInit() {
    this.fetchExams();
  }

  fetchExams(){
    this._examService.fetchExams().subscribe(data=>{
      console.log(data,"Exams");
      this.exams = data;
    })
  }

  gotoRoute(id){
    this.router.navigate(['/questionPaper', id]);
  }
}
