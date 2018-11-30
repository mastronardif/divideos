import { Injectable } from '@angular/core';
import { DomService } from './dom.service';

@Injectable()
export class ModalService {

  constructor(private domService: DomService) { }

  private modalElementId = 'modal-container';
  private overlayElementId = 'overlay';

  //init(component: any, inputs: object, outputs: object) {
  init(component: any, inputs: any, outputs: object) {    
    // alert(`modal.service.init: inputs= ${JSON.stringify(inputs)}`);
    console.log(`inputs=${inputs}`);
    var newArr = [];
    while(inputs.tags.length) {
      newArr.push(inputs.tags.splice(0,3));
    }
   // tags: any[];
    //videoId: any[];
  
console.log(`newArr=${newArr}`);

    let componentConfig = {
      inputs: {tags: newArr, videoId: "n/a"},
      outputs: outputs
    }
    this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
    document.getElementById(this.modalElementId).className = 'show';
    document.getElementById(this.overlayElementId).className = 'show';
  }

  destroy() {
    this.domService.removeComponent();
    document.getElementById(this.modalElementId).className = 'hidden';
    document.getElementById(this.overlayElementId).className = 'hidden';
  }
}