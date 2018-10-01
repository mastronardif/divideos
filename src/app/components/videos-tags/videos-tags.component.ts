import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { ModalService } from '../../shared/services/modal.service';
import {SampleComponent} from '../sample/sample.component';

@Component({
  selector: 'app-videos-tags',
  templateUrl: './videos-tags.component.html',
  styleUrls: ['./videos-tags.component.css']
})
export class VideosTagsComponent implements OnInit {

  constructor(private modal: ModalService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  popupVideoTags(msg) {
   // alert(msg);

    let inputs = {
      isMobile: false
    };
    this.modal.init(SampleComponent, inputs, {});
}
}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {}
