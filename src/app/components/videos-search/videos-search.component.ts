import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'videos-search',
  templateUrl: './videos-search.component.html',
  styleUrls: ['./videos-search.component.css']
})

export class VideosSearchComponent implements OnInit {
  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;
  @Input() defquery: string;

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

  ngOnInit(): void {
    this.searchForm.setValue({  query: this.defquery });
  }

  doSearch(event): void {
    if (this.loadingInProgress || (this.searchForm.value.query.trim().length === 0) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }
    console.log('\t FM doSearch', event);
    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;
    //alert('this.last_search= ' +  this.last_search);

    this.youtubeService.searchVideos22(this.last_search)
      .subscribe(response => {
        response.subscribe(res => {
          console.log('res.items=', res.items);
          console.log(response);
          this.videosUpdated.emit(res.items);
        });
      });
  }
}
