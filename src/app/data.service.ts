import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  entries:any = [];
  private entrySubscription:BehaviorSubject<any> = new BehaviorSubject([]);
  readonly entrySub$ = this.entrySubscription.asObservable();

  setEntries(entry){
    this.entries = [...this.entries,entry];
    this.entrySubscription.next(this.entries);
  }

  getEntries(){
    return this.entries
  }


}
