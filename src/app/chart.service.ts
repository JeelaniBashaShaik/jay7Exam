import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChartService {

  constructor(private http:HttpClient) { }

  fetchPieData():Observable<any>{
    return this.http.get('./assets/pieData.json');
  }

  fetchBarData(){
    return this.http.get('./assets/barData.json');
  }

}
