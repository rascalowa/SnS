import { TravelExpand } from './travel-expand/travel-expand.model';
import { TravelListService } from './travel-list.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

//Necessary when my service gets another service injected
@Injectable({ providedIn: 'root' })
export class DBService{

  private travelExpands: TravelExpand[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private travelListService: TravelListService) {}

  storeExpands(){
   const expands = this.travelListService.getTravelList();
   this.http.put('https://ng-sns.firebaseio.com/expands.json', expands)
    .subscribe(response => {
      console.log(response);
    });
  }

  // WITH FIRST PAGE LOADING
  fetchExpands(){
    // take 1 (to get token) and unsubscribe - get one user if there is any when db data are fetched
    // cannot return from inside subscribe() -> observable chain(2in1): take one from first observable, exhaustMap waits for it to complete, then replace it with second observable. After it you can subscribe in cmp
    console.log("DBS fetchExpands");
    return this.http
    .get<TravelExpand[]>(
      'https://ng-sns.firebaseio.com/expands.json'
      )
      //PIPE CODE DOES NOT RUN!
      .pipe(
        tap(expands => {
          console.log("DBS fetch -> pipe")
          this.travelListService.setTravelList(expands);
          // this.setTravelList(expands);
        })
      );
  };

  setTravelList(travelExpands: TravelExpand[]) {
    console.log("DBS setList")
    this.travelExpands = travelExpands;
    console.log(this.travelExpands);
  }

  // to return direct reference to this array - exact copy in case of changing we still have original one, so we really can access it from outside
  getTravelList() {
    console.log("DBS getList");
    return this.travelExpands.slice();

  }

  getTravelCountry(index: number){
    console.log("DBS getCountry");
    return this.travelExpands[index];
  }
}
