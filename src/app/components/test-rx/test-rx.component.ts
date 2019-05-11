import { Component, OnInit } from '@angular/core';
import { DataService } from '../../shared/services/data.service';
//import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-test-rx',
  templateUrl: './test-rx.component.html',
  styleUrls: ['./test-rx.component.css']
})

export class TestRxComponent implements OnInit {

  //message: string;
  message: any;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  newMessage() {
    this.data.changeMessage('Hello from Sibling');
  }
}
