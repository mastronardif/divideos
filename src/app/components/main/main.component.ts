import { Component, AfterViewInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { NotificationService } from '../../shared/services/notification.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { ModalService } from '../../shared/services/modal.service';
import { UserService } from '../../shared/services/UserService';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GoogleAuthService } from 'ng-gapi';
import { GoogleApiService } from 'ng-gapi';
//import { VideosdoclistComponent22 } from '../videos-doclist22/videos-doclist22.component';

//import {SampleComponent} from '../sample/sample.component';
import { Observable } from 'rxjs/Observable';

//import 'rxjs/add/observable/forkJoin';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { markDirtyIfOnPush } from '@angular/core/src/render3/instructions';
//import 'rxjs/add/observable/from'; 

//https://stackblitz.com/edit/ng-gapi-example?file=app%2Fapp.component.html

@Component({
  selector: 'main-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@NgModule({
  providers: [ModalService],
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

  protected fuck$: Observable<any[]>;
  //protected videos$: Observable<any[]>;
  //protected videos22$: Observable<any[]>;
  protected videos: any;
  isLoggedIn:boolean = false;
  public user = "wtf";
  
  //message:string;

  constructor(private data: DataService,
              //private modal: ModalService,
              public youtubeService: YoutubeApiService,
              private youtubePlayer: YoutubePlayerService,
              private playlistService: PlaylistStoreService,
              private playlistSortbyService: PlaylistSortbyService,
              private notificationService: NotificationService,
              private userService: UserService,

              //private videosdoclistComponent22: VideosdoclistComponent22,

              private httpClient: HttpClient,
              private authService: GoogleAuthService,
              private gapiService: GoogleApiService) {

      // First make sure gapi is loaded can be in AppInitilizer
      this.gapiService.onLoad().subscribe();

      this.videoPlaylist = this.playlistService.retrieveStorage().playlists;

//setTimeout(() => {
      this.data.currentMessage.subscribe(message => {
        console.log("message", message);
        this.videoList = message;
       });
//});
  }

  public isLoggedin(): boolean {
    //console.log("\t this.userService.getCurrentUser()= ", this.userService.getCurrentUser());
    //this.user = (this.userService.isUserSignedIn()) ? this.userService.getCurrentUser() : 'fuck';
    //this.getUserInfo();
    return this.userService.isUserSignedIn();
  }

  public setUserInfo() {
    // this.userService.getCurrentUser().getBasicProfile().getEmail()
    this.user = this.userService.getCurrentUserEmail(); //this.userService.getCurrentUser().getBasicProfile().getEmail();
    console.log(this.userService.getCurrentUser());
  }

  public signOut() {
    this.userService.signOut();
    this.isLoggedIn = false;
  }

  public signIn() {
    // this.userService.signIn(this.setTheFuckers);
    this.userService.signIn(() => {
      this.setUserInfo(); //      this.user = this.userService.getCurrentUserEmail(); 
      this.isLoggedIn = true;
    });
    //   this.authService.getAuth().subscribe((auth) => {
    //     if (auth.isSignedIn.get()) {
    //       console.log(auth.currentUser.get().getBasicProfile());
    //       this.isLoggedIn = true;
    //       this.getUserInfo();
    //     } else {
    //       auth.signIn().then((response) => {
    //         console.log("signIn user profile");
    //         console.log(response.getBasicProfile());
    //         this.isLoggedIn = true;
    //         this.getUserInfo();
    //       });
    //     }
    //  });

  }

  ngAfterViewInit() {
    this.isLoggedIn = this.isLoggedin();
    if (this.isLoggedIn) { this.setUserInfo(); }
    //let inputs = {
    //  isMobile: false
    //};
    //this.modal.init(SampleComponent, inputs, {});


    // setTimeout(() => {
    //  this.data.currentMessage.subscribe(message => {
    //    console.log("message", message);
    //    this.videoList = message;
    //   });
    // });

    this.playlistElement = document.getElementById('playlist');
    //this.videos$ = this.youtubeService.searchVideos('The Doors'); 

  //setTimeout(() => {

    this.youtubeService.searchVideos22('The Doors')
      .subscribe(response => {
        response.subscribe(res => {
          this.videos = res;
          this.videoList = res.items;
        });
      });
  //}

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
  
  lmypl(): void {
    console.log(this.userService.getCurrentUserEmail() ); 
    
    //videosdoclistComponent22.lpl('PLaaxGO6E_rXdc0IYBphYL3YNbaAOmv2iM');
    //return;

    const token = this.userService.getToken();
    this.fuck$ =  this.getPlaylists('123', token); 
    this.fuck$.subscribe((response: any) => {
        //this.videos = response;

        //this.videoList =  response.items;

        const pls = response.items.map(obj => ({
          kind: obj.kind,
          id: obj.id,
          snippet: {
            publishedAt: obj.snippet.publishedAt,
            channelId: obj.snippet.channelId,
            title: obj.snippet.title
          },
          contentDetails: obj.contentDetails,
        }));
        console.log(pls);
        //console.log(JSON.stringify(pls,  undefined, 4) );
        //this.videoList = pls;

      //   this. youtubeService.getPlaylistFor('Jake.Mastronardi', pls[1].id)
      //   .subscribe(response => {
      //     response.subscribe(res => {
      //     const jsonRes = res;
      //     let res22 = jsonRes['items'];
    
      //     // fix the videoID issue.
      //     // i dont think you have to do this this.playlistSortbyService.fixPlaylist(res22);
      //       this.videoList=res22;
      //     //newlist = res22;
      //     //this.data.changeMessage(newlist);
      //   });
      // });

        // new shit da all return list begin
        console.log('new shit');
        const observableArray: any = [];
        //observableArray.push(this.youtubeService.getPlaylistFor('Jake.Mastronardi', pls[1].id); pls.length
        for (let ii = 0; ii < pls.length; ii++) {
          
          observableArray.push(this.youtubeService.getPlaylistFor('TBDJake.Mastronardi', pls[ii].id));
          console.log(`ii(${ii})`);
        }
        //pls.forEach(it => {
          //observableArray.push(this.youtubeService.getPlaylistFor('Jake.Mastronardi', it.id);
        //});

        this.videoList = [];
        forkJoin(observableArray)
          .subscribe(resp => {
              //console.log(resp[0]);

              //forkJoin(resp).subscribe(data => {console.log(`data= ${data}`); });              
              //let fuck = forkJoin(resp).map(data => ({f: data.items } ));

              resp.forEach((obs: Observable<any>) => {
                  if (obs.subscribe) {
                    
                  obs.subscribe(res => {
                  const jsonRes = res;
                  const res22 = jsonRes['items'];
                  console.log(res22);
                  //
                  //this.videoList = res22;

                  res22.forEach(fu => {this.videoList.push(fu); });

                  //myPush()
                  // this.videoList.push(res22);
                },
                error => console.log('oops', error)
                );                
              } else {console.log('WTF obs.subscribe undefined!!!') }


              });
              
            //   resp[0].subscribe(res => {
            //   const jsonRes = res;
            //   const res22 = jsonRes['items'];
            //   console.log(res22);
            // });


          });

        //const getPostTwo$ = Rx.Observable.timer(2000).mapTo({id: 2});
        //Rx.Observable.forkJoin(getPostOne$, getPostTwo$).subscribe(res => console.log(res));
        // forkJoin([this.youtubeService.getPlaylistFor('Jake.Mastronardi', pls[1].id),
        //          , this.youtubeService.getPlaylistFor('Jake.Mastronardi', pls[2].id)]
        // )
        // .subscribe(resp => {
        //   console.log(resp);

        //   resp.map(rrr=> {
        //     rrr.subscribe(res => {
        //       const jsonRes = res;
        //       let res22 = jsonRes['items'];
        //       console.log(res);
        //     });

        //   });

        //    resp[0].subscribe(res => {
        //      const jsonRes = res;
        //      let res22 = jsonRes['items'];
        //      console.log(res);
        //    });          

        // });
        // new shit da all return list end

        // old one
            //  this.playlistSortbyService.getPlaylistFor('Jake.Mastronardi', id)
            // .subscribe(response => {
            //   const jsonRes = response;
            //   let res = jsonRes['items'];
            //   // fix the videoID issue.
            //   this.playlistSortbyService.fixPlaylist(res);
        
            //   newlist = res;
            //   this.data.changeMessage(newlist);
            // });
        

        });
  }

  // authtoken as parameter only for demo purpose , better use a UserService to get the token
  public getPlaylists(spreadsheetId: string, authtoken: string): Observable<any> {
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlists';
    // return this.httpClient.get(API_URL + '/' + spreadsheetId, {
      return this.httpClient.get(API_URL + '' + '?maxResults=22&mine=true&part=snippet,contentDetails', {
        headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

}

