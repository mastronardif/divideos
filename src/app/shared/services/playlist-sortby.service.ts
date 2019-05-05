import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { NotificationService } from '../services/notification.service';
import { jakegoals } from '../../model/jake_goals';
import { jakegoals1 } from '../../model/jake_goals1';
import { jakegoals2 } from '../../model/jake_goals2';
import { jakegoals3 } from '../../model/jake_goals3';
import { jakegoals4 } from '../../model/jake_goals4';
import { YOUTUBE_API_KEY } from '../constants';

@Injectable()
export class PlaylistSortbyService {
  base_url = 'https://www.googleapis.com/youtube/v3/';
  private ngxYTPlayer = 'ngx_yt_player';
  private playlists_template: Object = {
    'playlists': []
  };

  constructor(private http: HttpClient, private notificationService: NotificationService) {  }

  private init(): void {
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(this.playlists_template));
  }

// helper
  fixPlaylist(items) {
    // make id = .....videoId.
    items.forEach(function(a) {
      a.id = a.snippet.resourceId.videoId;
    });
  }

  getPlaylistFor(user: string, id: string): Observable<any> {
    const maxResults = 20;

    const url = this.base_url + 'playlistItems?playlistId=' + id + '&maxResults=' + maxResults +
    '&part=snippet%2CcontentDetails&key=' + YOUTUBE_API_KEY;

    console.log(`url= ${url}`);
    return this
      .http
      //.get(`${this.path}/api/courses`)
      .get(url)
      // .pipe(
      //   map(response => {
      //     let jsonRes = response;
      //     //console.log(jsonRes);  
      //     let res = jsonRes['items'];
      //     let ids = [];
      //     res.forEach((item) => {
      //       ids.push(item.id.videoId);
      //     });

      //     console.log(ids.length);
      //     //console.log(`ids= ${ids}`);                    
      //     //return this.getVideos(ids);
      //   })
      // )
      
      ;
      /***         
      .pipe(
        map(results =>             
          {
          let jsonRes = results;
          let res = jsonRes['items'];
          console.log(`jsonRes['items']= ${jsonRes['items']}`);
          return res;
        }
      )) ****/
      ;
  }

  public getPlayListFor_test(user: string, id: string) : object {
    
    switch (id) {
      case 'id1': {
        return jakegoals1;
        //break;
      }
      case 'id2': {
        return jakegoals2;
        //break;
      }
      case 'id3': {
        return jakegoals3;
        //break;
      }
      case 'id4': {
        return jakegoals4;
        //break;
      }
      // case 'idoutlinefromuser': {
      //   return `
      //   <h2>My outline22</h2>
      //   <button id="lpl_tip" (click)="lpl('PLaaxGO6E_rXecrc6icFvcV7JRMs_gI6OZ')">ZZZZZZ</button>
      //   `;
      // }
      default: {
        return ;
      }
    }

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

    public dynamicSortFI22(arr: any[], query: any[], direction: string) {
      arr.sort(function (a, b) {
        let achk = [];
        let bchk = [];
    
        if (a.snippet.tags) {
          achk = a.snippet.tags.filter(ee => {
            return query.indexOf(ee) > -1;
          });
        }
    
        if (b.snippet.tags) {
          bchk = b.snippet.tags.filter(ee => {
            return query.indexOf(ee) > -1;
          });
        }
    
        let bbb = 0;
        if (direction === 'asc') {
          bbb = bchk.length - achk.length;
        } else {
          bbb = achk.length - bchk.length
        }
    
        return bbb;
      });
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
    alert('public clearPlaylist() {');
    //this.init();
  }

  public importPlaylist(videos: any): void {
    let store = this.parse();
    store.playlists = videos;
    localStorage.setItem(this.ngxYTPlayer, JSON.stringify(store));
  }
}
