import { Component, AfterViewInit } from '@angular/core';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { NotificationService } from '../../shared/services/notification.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'main-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements AfterViewInit {
  public videoList = [];
  public videoPlaylist = [];
  public loadingInProgress = false;
  public playlistToggle = false;
  public doclistToggle = false;
  public playlistNames = false;
  public repeat = false;
  public shuffle = false;
  public playlistElement: any;
  private pageLoadingFinished = false;

  protected videos$: Observable<any[]>;
  protected videos22$: Observable<any[]>;
  protected videos: any;

  
  //message:string;

  constructor(
    private data: DataService,
    public youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService,
    private playlistSortbyService: PlaylistSortbyService,
    private notificationService: NotificationService) {
    this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
  }

  ngAfterViewInit() {
    this.data.currentMessage.subscribe(message => {
      console.log(message, message);
      this.videoList = message;
    });

    this.playlistElement = document.getElementById('playlist');
    //this.videos$ = this.youtubeService.searchVideos('The Doors'); 
    //console.log("xxx= ", document.getElementsByClassName('mdl-cell custom-cell mdl-cell--2-col') );

    // wtf 8/4/18
    //this.videos22$ = this.youtubeService.searchVideos22('The Who');
    this.youtubeService.searchVideos22('The Who')
      .subscribe(response => {
        response.subscribe(res => {
          this.videos = res;
          //console.log('res.items=', res.items);
          this.videoList = res.items;
          //console.log(response)
        });
      });
  }

  playFirstInPlaylist(): void {
    if (this.videoPlaylist[0]) {
      this.playlistElement.scrollTop = 0;
      this.youtubePlayer.playVideo(this.videoPlaylist[0].id, this.videoPlaylist[0].snippet.title);
    }
  }

  handleSearchVideo(videos: Array<any>): void {
    //alert('handleSearchVideo');
    this.videoList = videos;
  }

  checkAddToPlaylist(video: any): void {
    if (!this.videoPlaylist.some((e) => e.id === video.id)) {
      this.videoPlaylist.push(video);
      this.playlistService.addToPlaylist(video);

      const inPlaylist = this.videoPlaylist.length - 1;

      setTimeout(() => {
        const topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
        this.playlistElement.scrollTop = topPos - 100;
      });
    }
  }

  repeatActive(val: boolean): void {
    this.repeat = val;
    this.shuffle = false;
  }

  shuffleActive(val: boolean): void {
    this.shuffle = val;
    this.repeat = false;
  }

  togglePlaylist(): void {
    this.playlistToggle = !this.playlistToggle;
    setTimeout(() => {
      this.playlistNames = !this.playlistNames;
    }, 200);
  }

  toggleDoclist(): void {
    this.playlistToggle = !this.playlistToggle;
    setTimeout(() => {
      this.playlistNames = !this.playlistNames;
    }, 200);
  }

  searchMore(): void {
    if (1 === 1) { return; } // FM for testing

    console.log('searchMore 11 this = ', this);
    if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) {
      return;
    }
    console.log('searchMore 22 this = ', this);
    this.loadingInProgress = true;


    // begin
    // this.youtubeService.searchNext()
    //   .subscribe(response => {
    //     response.subscribe(res => {
    //       this.videos = res;
    //       console.log('\t ******* search more res.items=', res.items);
    //       this.videoList = res.items;
    //     });
    //   });
    // end
    this.youtubeService.searchNext()
      .subscribe(response => {
        console.log('******************* ', response);
        this.loadingInProgress = false;
        response.subscribe(data => {
          this.loadingInProgress = false;
          if (data.items.length < 1 || data.status === 400) {
            setTimeout(() => {
              this.pageLoadingFinished = true;
              setTimeout(() => {
                this.pageLoadingFinished = false;
              }, 10000);
            })
            return;
          }
          data.items.forEach((val) => {
            this.videoList.push(val);
          });
        });
      });
  }

  nextVideo(): void {
    this.playPrevNext(true);
  }

  prevVideo(): void {
    this.playPrevNext(false);
  }

  playPrevNext(value): void {
    let current = this.youtubePlayer.getCurrentVideo();
    let inPlaylist;

    this.videoPlaylist.forEach((video, index) => {
      if (video.id === current) {
        inPlaylist = index;
      }
    });

    // if-else hell
    if (inPlaylist !== undefined) {
      let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
      if (this.shuffle) {
        let shuffled = this.videoPlaylist[this.youtubePlayer.getShuffled(inPlaylist, this.videoPlaylist.length)];
        this.youtubePlayer.playVideo(shuffled.id, shuffled.snippet.title);
        this.playlistElement.scrollTop = document.getElementById(shuffled.id).offsetTop - 100;
      } else {
        if (value) {
          if (this.videoPlaylist.length - 1 === inPlaylist) {
            this.youtubePlayer.playVideo(this.videoPlaylist[0].id, this.videoPlaylist[0].snippet.title);
            this.playlistElement.scrollTop = 0;
          } else {
            this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id, this.videoPlaylist[inPlaylist + 1].snippet.title)
            this.playlistElement.scrollTop = topPos - 100;
          }
        } else {
          if (inPlaylist === 0) {
            this.youtubePlayer.playVideo(this.videoPlaylist[this.videoPlaylist.length - 1].id,
              this.videoPlaylist[this.videoPlaylist.length - 1].snippet.title);
            this.playlistElement.scrollTop = this.playlistElement.offsetHeight;
          } else {
            this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist - 1].id, this.videoPlaylist[inPlaylist - 1].snippet.title)
            this.playlistElement.scrollTop = topPos - 230;
          }
        }
      }
    } else {
      this.playFirstInPlaylist();
    }
  }

  closePlaylist(): void {
    this.playlistToggle = false;
    this.playlistNames = false;
  }

  closeDoclist(): void {
    this.playlistToggle = false;
    this.playlistNames = false;
  }


  clearPlaylist(): void {
    this.videoPlaylist = [];
    this.playlistService.clearPlaylist();
    this.notificationService.showNotification('Playlist cleared.');
  }

  exportPlaylist(): void {
    if (this.videoPlaylist.length < 1) {
      this.notificationService.showNotification('Nothing to export.');
      return;
    }
    let data = JSON.stringify(this.videoPlaylist);
    let a = document.createElement('a');
    let file = new Blob([data], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'playlist.json';
    a.click();
    this.notificationService.showNotification('Playlist exported.');
  }

  importPlaylist(playlist: any): void {
    this.videoPlaylist = playlist;
    this.playlistService.importPlaylist(this.videoPlaylist);
  }

  lpl(): void {
    if (this.videoPlaylist.length > 0) {
      this.videoList = this.videoPlaylist;
    }
  }

}

