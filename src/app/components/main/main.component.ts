import { Component, AfterViewInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
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
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';

// import 'rxjs/add/observable/from'; 
// https://stackblitz.com/edit/ng-gapi-example?file=app%2Fapp.component.html

@Component({
  selector: 'main-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

@NgModule({
  providers: [ModalService],
})

export class MainComponent implements AfterViewInit {
  public originalVideoList:     any[] = [];
  public tags: any;  //any [] = [['aa', 'aa'], ['cc', 'dd']];

  public videoList:     any[] = []; // | {}[] = [];
  public videoPlaylist: any[] = [];

  public selectedVideo = {};
  public loadingInProgress = false;
  public playlistToggle = false;
  public leftPaneToggle = false;
  public leftPaneSHowTagsForVideo = false;

//  public bSHowTagsForVideo = false;
  public defaultSearch = 'Autism';
  public doclistToggle = false;
  public playlistNames = false;
  public repeat = false;
  public shuffle = false;
  public playlistElement: any;
  private pageLoadingFinished = false;
  public editorToggle = false;
  public tagsToggle = false;
  public tagsTreeViewToggle = false;
  public tagsEditorViewToggle = false;

  protected fuck$: Observable<any[]>;
  //protected videos$: Observable<any[]>;
  //protected videos22$: Observable<any[]>;
  protected videos: any;
  isLoggedIn:boolean = false;
  public user = 'wtf';

  // message:string;

  constructor(private data: DataService,
              private router: Router,
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
      this.data.currentMessage.subscribe((message) => {
        console.log("this.data.currentMessage.subscribe, message= ", message);
        if (message['setOriginal']) {
          this.videoList = message['message'];
        }
        else {
          this.videoList = message;
        }        

        if (message['setOriginal'] && message['setOriginal'] === true) {
          this.originalVideoList = message['message'];
        }
        //console.log("\t fm 1 SETTING originalVideoList");
        //this.originalVideoList = message; // test staic data
        this.tags = data.countTags(this.originalVideoList);
        console.log('\t***FM THE TAGS tags = ', this.tags);
       });
  }

  public isLoggedin(): boolean {
    //console.log("\t this.userService.getCurrentUser()= ", this.userService.getCurrentUser());
    //this.user = (this.userService.isUserSignedIn()) ? this.userService.getCurrentUser() : 'fuck';
    //this.getUserInfo();
    return this.userService.isUserSignedIn();
  }

  public setUserInfo() {
    this.user = this.userService.getCurrentUserEmail();
    console.log(this.userService.getCurrentUser());
  }

  public signOut() {
    this.userService.signOut();
    this.isLoggedIn = false;
  }

  public signIn() {
    this.userService.signIn(() => {
      this.setUserInfo();
      this.isLoggedIn = true;
    });
  }

  ngAfterViewInit() {
    this.isLoggedIn = this.isLoggedin();
    if (this.isLoggedIn) { this.setUserInfo(); }

    this.playlistElement = document.getElementById('playlist');
    //this.videos$ = this.youtubeService.searchVideos('The Doors'); 
    // this.youtubeService.searchVideos22('The Doors')
    this.youtubeService.searchVideos22(this.defaultSearch)
      .subscribe(response => {
        response.subscribe(res => {
          this.videos = res;
          this.videoList = res.items;
          //
          console.log("\t fm 2 SETTING originalVideoList");
          this.originalVideoList = res.items;
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
    this.videoList = videos;

    // fm 5/11/19 begin
    console.log(`fm 5/11/19  handleSearchVideo ${videos.length} ${this.videoList.length}`);
    // this.data.changeMessage(this.videoList);
    // fm 5/11/19 end
    // test 3/5/20
    const fu = {setOriginal: true, message: this.videoList};
    this.data.changeMessage(fu);

  }

  checkAddToPlaylist(video: any): void {
    if (!this.videoPlaylist.some((e: any) => e.id === video.id))  {
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

  toggleLeftPane(): void {
    this.leftPaneToggle = !this.leftPaneToggle;
    console.log('toggleLeftPane ', this.leftPaneToggle);
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

  showEditor(id): void {
    console.log(`showEditor(${id})`);

    if (id === 'TestRx') {
      this.router.navigateByUrl('/testrx');
      return;
    }
    if (id === 'Map1') {
      // pass this.videoList
      //this.router.navigateByUrl('/map1');      
      //this.router.navigateByUrl('/map1', { state: { hello: 'world' } });
      //this.router.navigateByUrl('/map1', { state: { hello: this.videoList } });
      this.router.navigateByUrl('/map1', { state: { hello: this.videoList } });
      return;
    }

    if (id === 'EDIT_NEW') {
      this.router.navigateByUrl('/newoutline',  { state: { config: { toolbar: [ '|'] } }});
      //[config]="{ toolbar: [ 'heading', '|', 'bold', 'italic' ] }"
      return;
    }

    if (id === 'ALDOS_OUTLINE') {
      this.router.navigateByUrl('/aldooutline');
      return;
    }

    if (id === 'EDIT_OUTLINE') {
      this.editorToggle = !this.editorToggle;
      return;
    }

    if (id === 'AllTags') {
      this.router.navigateByUrl('/alltags', { state: { hello: 'AllTags' } });
      return;
    }
    if (id === 'rTest2') {
      this.router.navigateByUrl('/test', { state: { hello: this.videoList } });
      return;
    }

    // Default shw tags
    this.tagsToggle = !this.tagsToggle;
  }

  showTags(id: string): void {
    console.log(`showTags(${id})`);
    if (id === 'TREEVIEW') {
      this.tagsTreeViewToggle = !this.tagsTreeViewToggle;
      return;
    }

    // Default shw tags
    this.tagsToggle = !this.tagsToggle;
  }

    displayTags(eee) {
    console.log('an event emited, displayTags video= ', eee);
    this.selectedVideo = eee.video;
    if (eee.id === 'editorToggleClose') {
      this.editorToggle = false;
    } else if (eee.id === 'popup') {
      this.showTags('tags');
    } else if (eee.id === 'leftsidelist') {
      this.leftPaneSHowTagsForVideo = !this.leftPaneSHowTagsForVideo;
      //this.leftPaneSHowTagsForVideo = true;
      //alert(`leftPaneSHowTagsForVideo= ${this.leftPaneSHowTagsForVideo}`);
      //this.toggleDoclist();
      //this.showTags();
    }
  }

  leftSideDisplayTagsFor(video) {
    // console.log('an event emited, displayTags video= ', video);
    this.selectedVideo = video;
    this.toggleLeftPane();
    //this.showTags();
  }

  lpl(): void { 
    console.log(`\t *FM lpl(): void this.tagsToggle= ${this.tagsToggle}`);
    if (this.videoPlaylist.length > 0) {
      this.videoList = this.videoPlaylist;

    // fm 5/11/19 begin
    //this.data.changeMessage(this.videoList);
    // fm 5/11/19 end

    // test 3/5/20
    var fu = {setOriginal: true, message: this.videoList};
    this.data.changeMessage(fu);

    }
  }

  lmypl(): void {
    console.log('lmypl():', this.userService.getCurrentUserEmail() ); 
    //console.log("\t fm 3 SETTING originalVideoList");
    const token = this.userService.getToken();
    this.fuck$ =  this.getPlaylists('123', token); 
    this.fuck$.subscribe((response: any) => {
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
        console.log('pls= ', pls);
        this.data.setOption('size', pls);  
        this.data.setOption('square', 'N pleaswe square');  

        // new shit.  all return list begin
        console.log('line(445) new shit');
        const observableArray: any = [];

        for (let ii = 0; ii < pls.length; ii++) {
          observableArray.push(this.youtubeService.getPlaylistFor('TBDJake.Mastronardi', pls[ii].id));
          console.log(`ii(${ii})`);
        };

        this.videoList = [];
        this.originalVideoList = [];
        forkJoin(observableArray)
          .subscribe(resp => {
              resp.forEach((obs: Observable<any>) => {
                  if (obs.subscribe) {
                    obs.subscribe(res => {
                    const jsonRes = res;
                    const res22 = jsonRes['items'];
                    console.log(res22);

                    res22.forEach(fu => {this.originalVideoList.push(fu); this.videoList.push(fu); });
                    },
                    error => console.log('oops', error)
                    );
                  } else {console.log('WTF obs.subscribe undefined!!!') }
              });
          });
        });
  }

  // authtoken as parameter only for demo purpose , better use a UserService to get the token
  public getPlaylists(spreadsheetId: string, authtoken: string): Observable<any> {
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlists';
    // return this.httpClient.get(API_URL + '/' + spreadsheetId, {
      let url = API_URL + '' + '?maxResults=22&mine=true&part=snippet,contentDetails';
      console.log('FMDEBUG url= ', url);
      return this.httpClient.get(API_URL + '' + '?maxResults=22&mine=true&part=snippet,contentDetails', {
        headers: new HttpHeaders({
        Authorization: `Bearer ${authtoken}`
      })
    });
  }

}

