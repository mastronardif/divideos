import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  // private messageSource = new BehaviorSubject('default message');
  private messageSource = new BehaviorSubject([{}]);
  currentMessage = this.messageSource.asObservable();
  private data = {};  

  constructor() { }

  // changeMessage(message: string) {
  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  compare(b, a) {
    //return (b.name - a.name);
    return (a.id - b.id); //by count
  }

  countTags(videos: Array<any>){
    console.log('\t FM debug, Dataservice:countTags', videos);
    //if (!videos) {
      //return [];
    //}
    let allTags = videos.map(function(obj: any) { return obj.snippet.tags ? obj.snippet.tags : []; });
    console.log('\t FM allTags.: ngOnInit allTags =', allTags.length,  allTags);

    let dictionary = {};
    allTags = allTags ? allTags : [];

    for ( let ii = 0; ii < allTags.length; ii++ ) {
      for (let k = 0; k < allTags[ii].length; k++) {
        const fldName: string = allTags[ii][k];
      //  console.log(`fldName = ${fldName}`);
        if (typeof((<any>dictionary)[fldName]) === 'undefined') {
          (<any>dictionary)[fldName] = 1;
        } else {
          (<any>dictionary)[fldName] =  (<any>dictionary)[fldName] + 1;
        }
      }
     }

    const list = Object.keys(dictionary).map(function(key) { return {name: key, id: dictionary[key]}; });
    //const list22 = list.sort(this.compare).slice(0, );
    const maxTags  = 112;
    //list22.slice(0, maxTags);
    console.log('\t FM DEBUG.: list.length =', list.length);
    
    return list.slice(0, maxTags); //.length;
  }

  // Global data
  setOption(option, value) {   
    this.data[option] = value;  
  }

  getOption() {  
    return this.data;  
  }  
  //
}
