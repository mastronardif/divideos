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
  @Output() valueChange = new EventEmitter();

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
    console.log('addTagsToVideo(video: any): void {');
    this.valueChange.emit({video: video, id: 'popup'});
  }
  addTagsToVideo22(video: any): void {
    //console.log('addTagsToVideo(video: any): void {');
    this.valueChange.emit({video: video, id: 'leftsidelist'});
  }

  //////////////////////////
  // dragable shit BEGIN.
  dragstart_handler(ev: any) {
    console.log("dragStart");
    console.log(ev);
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data 
    ev.dataTransfer.setData("text/plain", ev.target.id);
   }
   
  // dragable shit END.
  /////////////////////////
}
