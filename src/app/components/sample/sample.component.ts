import { Component } from '@angular/core';

import { ModalService } from '../../shared/services/modal.service';


@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent  {
  //public inputs = [];
  tags: any[];
  videoId: any[];

  constructor(private modal: ModalService) { 
  //console.log(`sample._.ts: modal= ${JSON.stringify(modal)}`);
  console.log('sample._.ts: m, ', modal);
  }

  public close() {

    this.results = 'data set from popup!!!!!!!!!!!!!';
    console.log(`this.tags= $tags`);
    console.log(`this.results= $results`);
    console.log('sample.component.ts: ', this);
    this.modal.destroy();
  }
 
}
