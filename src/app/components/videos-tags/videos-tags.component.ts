import { Component, OnInit, Input } from '@angular/core';
import {MatDialog} from '@angular/material';
import { ModalService } from '../../shared/services/modal.service';
import {SampleComponent} from '../sample/sample.component';

@Component({
  selector: 'app-videos-tags',
  templateUrl: './videos-tags.component.html',
  styleUrls: ['./videos-tags.component.css']
})

export class VideosTagsComponent implements OnInit {
  @Input() text;
  @Input() tip;
  @Input() videoList;

  constructor(private modal: ModalService, public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


compare(b,a) {
  if (a.count < b.count)
    return -1;
  if (a.count > b.count)
    return 1;
  return 0;
}


  popupVideoTags(msg) {
    //const tags = ['Angry', 'Funny', 'Planning'];
    console.log(msg);
    console.log(this.videoList);
    let tags = [];
    //var distinct = [];

    var allTags = this.videoList.map(function(obj) { return obj.snippet.tags; });
    var dictionary = {};

    for( var i in allTags ) {
      for (var k in allTags[i]) {
        if( typeof( dictionary[allTags[i][k]]) == "undefined") {
          dictionary[allTags[i][k].toUpperCase()] = 1; //uniques[i][k]);
        }
        else {
          dictionary[allTags[i][k].toUpperCase()] =  dictionary[allTags[i][k].toUpperCase()] + 1;
        }
      }
     }

      //console.log(dictionary);
    var list = Object.keys(dictionary).map(function(key) { return {name: key, count: dictionary[key]}; });
     console.log(list);
     var list22 = list.sort(this.compare);
     console.log(list22);

     const maxTags  = 12;
     tags = list22.slice(0, maxTags).map(item => item.name);
console.log(`allTags= ${allTags}`);
console.log(`tags= ${tags}`);

    const inputs = {
      videoId: 0,
      tags: tags // video.snippet.tags //['Angry', 'Funny', 'Planning']
    };
    let myoutputs = {results: 'wtf input'};
    this.modal.init(SampleComponent, inputs, myoutputs);
  }
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
