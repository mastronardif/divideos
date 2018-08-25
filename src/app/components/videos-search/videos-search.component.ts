import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {  YoutubeApiService }   from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { NotificationService }  from '../../shared/services/notification.service';

@Component({
  selector: 'videos-search',
  templateUrl: './videos-search.component.html',
  styleUrls: ['./videos-search.component.css']
})
export class VideosSearchComponent {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });

  constructor(
    public fb: FormBuilder,
    private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private notificationService: NotificationService) {
    // this.youtubeService.searchVideos('autism dynamic intelligence DI')
    //   .then(data => {
    //     this.videosUpdated.emit(data);
    //   })
  }

  doSearch(event): void {
    if (this.loadingInProgress || (this.searchForm.value.query.trim().length === 0) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }

    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;
  //alert('this.last_search= ' +  this.last_search);

  this.youtubeService.searchVideos22(this.last_search)     
  .subscribe(response => {
    response.subscribe(res => {        
      //this.videos=res;
      console.log('res.items=', res.items);
      //this.videoList= res.items;
      console.log(response)
      this.videosUpdated.emit(res.items);
    });
  });
  }
}
