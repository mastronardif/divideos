import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { DataService } from '../../shared/services/data.service';

@Component({
  selector: 'app-treetags',
  templateUrl: './treetags.component.html',
  styleUrls: ['./treetags.component.css']
})
export class TreeTagsComponent implements OnInit {
  @Input() videoList;
  @Input() selectedVideo;
  @Output() valueChange = new EventEmitter();

  view: any[] = [700, 400];
  single: any[] = [
    {
      "name": "Angry",
      "value": 8
    },
    {
      "name": "USA",
      "value": 5
    },
    {
      "name": "US",
      "value": 4
    },
    {
      "name": "U",
      "value": 1
    },
    {
      "name": "a",
      "value": 1
    }
  ];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor() {
    //Object.assign(this, {single});
  }

  ngOnInit() {
    //console.log(`TreeTagsComponent:ngOnInit() = ${this.videoList}`);
    this.single = makeTreeData(this.videoList);
    //console.log('TreeTagsComponent:ngOnInit()', this.single);
  }

  onSelect(event) {
    console.log(event);
  }
}
function makeTreeData(videos) {
  let list: any[] = [];
  let allTags = videos.map(function(obj: any) { return obj.snippet.tags ? obj.snippet.tags : []; });
  
  let dictionary = {};
  allTags = allTags ? allTags : [];

  // group by 
  for ( let ii = 0; ii < allTags.length; ii++ ) {
    for (let k = 0; k < allTags[ii].length; k++) {
      const fldName: string = allTags[ii][k];

      if (typeof((<any>dictionary)[fldName]) === 'undefined') {
        (<any>dictionary)[fldName] = 1;
      } else {
        (<any>dictionary)[fldName] =  (<any>dictionary)[fldName] + 1;
      }
    }
  }

   list = Object.keys(dictionary).map(function(key) {
     return {name: key, value: dictionary[key]};
   });

  return list;
}
