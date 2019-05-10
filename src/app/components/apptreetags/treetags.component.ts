import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';

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
  single: any[] = [];

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  constructor(private playlistSortbyService: PlaylistSortbyService) {
    //Object.assign(this, {single});
  }

  ngOnInit() {
    console.log(`TreeTagsComponent:ngOnInit(), this= ${this} `);
    this.single = makeTreeData(this.videoList);
  }

  onSelect(event) {
    //console.log(event);    
    const selectedOrderIds = [event.name];
    this.playlistSortbyService.dynamicSortFI22(this.videoList, selectedOrderIds, 'asc');
    this.valueChange.emit({});
  }
}
function makeTreeData(videos) {
  let list: any[] = [];
  let allTags = videos ? videos.map(function(obj: any) { return obj.snippet.tags ? obj.snippet.tags : []; } ) :  [] ;
  
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
