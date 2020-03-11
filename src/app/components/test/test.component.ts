import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  @Output() valueChange = new EventEmitter(); 
  state$: Observable<object>;
  public gData: any; 

  constructor(private data: DataService, public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let wtf = this.data.getOption();
    this.gData = wtf;

    console.log('\t FM Test.: wtf =', wtf);

    this.state$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state))

  }

  cancel(val) {
    console.log('tes.comp cancel, val= ', val);
    this.valueChange.emit({id: val});
  }

}
