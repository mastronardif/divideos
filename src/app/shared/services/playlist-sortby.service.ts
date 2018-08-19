import { Injectable } from '@angular/core';
import { NotificationService } from '../services/notification.service';


@Injectable()
export class PlaylistSortbyService {
  private ngxYTPlayer = 'ngx_yt_player';
  private playlists_template: Object = {
    'playlists': []
  };

  constructor(private notificationService: NotificationService) {  }

  private init(): void {
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(this.playlists_template));
  }

    public test(videoList: any) : string {
      //alert(videoList[0]);
      console.log(videoList[0]);

        videoList.forEach((video, index) => {
        console.log(video.id, video.snippet.title);
        // if (video.id === current) {
        //     ;inPlaylist = index;
        // }
      });

      this.exportSortlist(videoList);
    
      return "this is a test from sort service";
    }

  public exportSortlist(videoList: any): void {
      if (videoList.length < 1) {
        this.notificationService.showNotification('Nothing to export.');
        return;
      }
      let data = JSON.stringify(videoList);
      let a = document.createElement('a');
      let file = new Blob([data], { type: 'text/json' });
      a.href = URL.createObjectURL(file);
      a.download = 'sortedlist.json';
      a.click();
      this.notificationService.showNotification('Playlist exported.');
    }

  public retrieveStorage() {
    let storedPlaylist = this.parse();
    if (!storedPlaylist) {
      this.init();
      storedPlaylist = this.parse();
    }

    return storedPlaylist;
  }

  public addToPlaylist(video: Object): void {
    let store = this.parse();
    store.playlists.push(video);
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }

  public removeFromPlaylist(video: any): void {
    let store = this.parse();
    store.playlists = store.playlists.filter(item => item.id !== video.id);
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }

  private parse() {
    return JSON.parse(localStorage.getItem(this.ngxYTPlayer));
  }

  public clearPlaylist() {
    this.init();
  }

  public importPlaylist(videos: any): void {
    let store = this.parse();
    store.playlists = videos;
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }
}
