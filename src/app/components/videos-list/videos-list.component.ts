import { Component, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
// import {SampleComponent} from '../sample/sample.component';
//https://stackoverflow.com/questions/54181363/ckeditor-drag-and-drop-with-angular-7#
@Component({
  selector: 'videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})

export class VideosListComponent {
  @Input() videoList;
  @Input() loadingInProgress;
  @Output() videoPlaylist = new EventEmitter();
  @Output() valueChange = new EventEmitter();

  private draggableElements = 3;
  private zonePrefix = 'zone-';
  // public myDragableObjects22: {data: DragData}[] = [];
  public myDragableObjects22: Array<any> =  [[]];
  constructor(private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService) {
   }

  play(video: any): void {
    this.youtubePlayer.playVideo(video.id, video.snippet.title);
    this.addToPlaylist(video);
  }

  addToPlaylist(video: any): void {
    this.videoPlaylist.emit(video);
  }

  addTagsToVideo(video: any): void {
    console.log('addTagsToVideo(video: any): void {');
    this.valueChange.emit({video: video, id: 'popup'});
  }
  addTagsToVideo22(video: any): void {
    //console.log('addTagsToVideo(video: any): void {');
    this.valueChange.emit({video: video, id: 'leftsidelist'});
  }
}
