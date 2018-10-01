import { Component, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { ModalService } from '../../shared/services/modal.service';
import {SampleComponent} from '../sample/sample.component';

@Component({
  selector: 'videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.css']
})
export class VideosListComponent {
  @Input() videoList;
  @Input() loadingInProgress;
  @Output() videoPlaylist = new EventEmitter();
  
  constructor(private modal: ModalService, private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService
  ) { }

  play(video: any): void {
    this.youtubePlayer.playVideo(video.id, video.snippet.title);
    this.addToPlaylist(video);
  }

  addToPlaylist(video: any): void {
    this.videoPlaylist.emit(video);
  }

  addTagsToVideo(video: any): void {
    //alert(`ID: ${video.id} \n ${JSON.stringify(video)}` );
    let inputs = {
      videoId: video.id,
      tags: ['Angry', 'Funny', 'Planning']
    };
    this.modal.init(SampleComponent, inputs, {});
  }


}
