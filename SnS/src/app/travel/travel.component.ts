import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TravelExpandService } from './travel-expand';
import { TravelExpand } from './travel-expand/travel-expand.model';
import { TravelListService } from './travel-list.service';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css', '../app.component.css']
})
export class TravelComponent implements OnInit {
  // $ to mark observables
  isScreenSmall$: Observable<boolean>;
  bodyText: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private travelExpandService: TravelExpandService,
    private travelListService: TravelListService,
    ) { }

  ngOnInit(): void {
    this.isScreenSmall$ = this.breakpointObserver
    .observe(['(max-width: 768px)'])
    //matches - boolean
    .pipe(map(({ matches })=> matches ))

    this.bodyText = 'This text will be updates';
    // this.travelExpands = this.travelListService.getTravelList();
  }

  openModal(id: number) {
    this.travelExpandService.expandId = id;
    this.travelExpandService.open('expand');
  }
}

