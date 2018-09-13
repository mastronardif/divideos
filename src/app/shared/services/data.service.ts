import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  // private messageSource = new BehaviorSubject('default message');
  private messageSource = new BehaviorSubject([{}]);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  // changeMessage(message: string) {
  changeMessage(message: any) {
    this.messageSource.next(message);
  }
}
