import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-videos-tags',
  templateUrl: './videos-tags.component.html',
  styleUrls: ['./videos-tags.component.css']
})
export class VideosTagsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  alert(msg) {
    alert(msg);
}
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
