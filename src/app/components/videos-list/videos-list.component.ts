import { Component, Input, Output, EventEmitter } from '@angular/core';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { ModalService } from '../../shared/services/modal.service';
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
  public myDragableObjects33: any = {};
  constructor(private modal: ModalService, private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService
  ) {

    const i = 1;
    //this.myDragableObjects22.push({
      this.myDragableObjects33  ={
      data: {
        id: i + 200,
        payload: `<figure class="image">
        <img src="https://i.ytimg.com/vi/bjJSA8hx35E/hqdefault.jpg" alt="">
        </figure>
        
        <p>
        <a href="https://www.youtube.com/watch?v=bjJSA8hx35E">play</a></p>
         ${i}`,
        name: 'My Draggable - ' + i + 200,
        currentColumn: i,
        payloadType: 'Free Wille'
      }
    };
   }

  private generateZones(zone: number): Array<string> {
    // Generate all available zones
    const zones: Array<string> = [];
    for (let i = 0; i < this.draggableElements; i++) {
      zones.push(this.zonePrefix + i);
    }
    // Remove the current zone
    zones.splice(zone, 1);
    return zones;  
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

  //////////////////////////
  // dragable shit BEGIN.
  dragstart_handler(ev: any) {
    console.log("dragStart");
    console.log(ev);
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data 
    ev.dataTransfer.setData("text/plain", 'ev.target.id');
   }
   
  // dragable shit END.
  /////////////////////////
}
