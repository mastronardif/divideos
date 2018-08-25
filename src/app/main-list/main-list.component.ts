import { Component, OnInit } from '@angular/core';
import {  YoutubeApiService } from '../shared/services/youtube-api.service';
import { Observable } from 'rxjs';
import { ICourse } from '../model/course';

@Component({
  selector: 'appmain-list',
  templateUrl: './main-list.component.html',
  styleUrls: ['./main-list.component.css']
})
export class MainListComponent implements OnInit {
  //protected users$: Observable<ICourse[]>;
  public videoList = [];
  protected users$: Observable<any[]>;
  protected users: any;
  protected videos$: Observable<any[]>;
  protected videos: any;
  protected wtf: any;

  show: boolean = false;
  showVideos: boolean = false;

  constructor(public youtubeService: YoutubeApiService) {     
  }

  ngOnInit() {   
    //this.users$  = this.youtubeService.getUsers(); 
    this.videos$ = this.youtubeService.searchVideos22('The Doors');

    this.videos$.subscribe(val => {
      console.log(`\n videos= ${val}`);
      console.log(val);

      // this.showVideos=true;      
    });

  //   this.users$.subscribe(val => {
  //     console.log(`\n FFFFF= ${val}`);
  //     console.log(val);
  //     this.users= val;
  //     this.show=true;
  // });
  }
}
