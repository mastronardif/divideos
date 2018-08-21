import { Component, ElementRef, AfterViewInit } from '@angular/core';
//import { YoutubeApiService } from '../shared/services/youtube-api.service';
//'./ services/youtube-api.service';
import { YoutubeApiService } from '../../shared/services/youtube-api.service';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { NotificationService } from '../../shared/services/notification.service';
import {  PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import {Observable} from "rxjs";

//import { Observable, observable } from 'rxjs';

@Component({
  selector: 'main-list',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit{ //OnInit {
  public videoList = [];
  public videoPlaylist = [];
  public loadingInProgress = false;
  public playlistToggle = false;
  public playlistNames = false;
  public repeat = false;
  public shuffle = false;
  public playlistElement: any;
  private pageLoadingFinished = false;

  protected videos$: Observable<any[]>;
  protected videos22$: Observable<any[]>;
  protected videos: any;

  checkbox2 = false; 
  options = [
    {name:'DIAttribute', value:'AAA', checked:true},
    {name:'DIAttribute', value:'BBB', checked:false},
    {name:'DIAttribute', value:'CCC', checked:true},

    {name:'DIAttribute', value:'DDD', checked:true},
    {name:'DIAttribute', value:'EEE', checked:false},
    {name:'DIAttribute', value:'FFF', checked:true}

  ];

  constructor(
    private checkBox1: ElementRef,
    public youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService,
    private playlistSortbyService: PlaylistSortbyService,

    private notificationService: NotificationService    
  ) {
    this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
   }

  ngAfterViewInit() {//ngOnInit() {
    this.playlistElement = document.getElementById('playlist');
    //this.videos$ = this.youtubeService.searchVideos('The Doors'); 
    //console.log("xxx= ", document.getElementsByClassName('mdl-cell custom-cell mdl-cell--2-col') );

          
      // wtf 8/4/18
      // this.youtubeService.getVideos('ass')
      //   .subscribe(response => this.videos = response);

      // wtf 8/4/18
      this.videos22$ = this.youtubeService.searchVideos22('The Who'); 
      this.youtubeService.searchVideos22('The Who')      
        .subscribe(response => {

          response.subscribe(res => {        
            this.videos=res;
            console.log('res.items=', res.items);
            this.videoList= res.items;
            console.log(response)
          });
    });
      //return;

    // this.videos$.subscribe(val => {
    //   console.log(`\n videos= ${val}`);
    //   console.log(val);

    //   //let bobo:Observable=val;
    //   this.videos= val.subscribe(res => {        
    //     this.videos=res;
    //     console.log('res.items=', res.items);
    //     this.videoList= res.items;
    //     //console.log('wtf=', this.wtf)     
    //   });
      // this.showVideos=true;      
    //});
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

      let inPlaylist = this.videoPlaylist.length - 1;

      setTimeout(() => {
        let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
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

  searchMore(): void {
	  //alert('searchMore loadingInProgress ');
	  console.log("this = ", this);
    if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) {
      return;
    }
//alert('searchMore')
    this.loadingInProgress = true;
    this.youtubeService.searchNext()
      .then(data => {
        this.loadingInProgress = false;
        if (data.length < 1 || data.status === 400) {
          setTimeout(() => {
            this.pageLoadingFinished = true;
            setTimeout(() => {
              this.pageLoadingFinished = false;
            }, 10000);
          })
          return;
        }
        data.forEach((val) => {
          this.videoList.push(val);
        });
      }).catch(error => {
        this.loadingInProgress = false;
      })
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
  
   lpl() : void {
	  if (this.videoPlaylist.length > 0) {
		  this.videoList = this.videoPlaylist;
    }	  
  }
    
  decorate() : void {
    console.log('decorate() : void {');    
    var list = document.getElementsByClassName('mdl-cell custom-cell mdl-cell--2-col');
    console.log(list[0].innerHTML);
    var decorators = 
    '<td>'+    
'<br/>  <label><input id="checkBox" type="checkbox">AAA </label>'+
'<br/> <input id="checkBox" type="checkbox">BBB'+
'<br/> <input id="checkBox" type="checkbox">CCC'+
'<br/> <input id="checkBox" type="checkbox">DDD'+
'<br/> <input id="checkBox" type="checkbox">EEE'+
'<br/> <input id="checkBox" type="checkbox">FFF'+
'</td>'

for (var idx = 0; idx < list.length; idx++) {
  //console.log(list[i].id); //second console output
  list[idx].innerHTML = list[idx].innerHTML.replace('</td>', decorators);
}

    //list[0].innerHTML = list[0].innerHTML.replace('Fuck ','Fuck XXXXXXX');



    //list[0].innerHTML = list[0].innerHTML.replace('</td>', decorators);

    console.log("xxx= ", document.getElementsByClassName('mdl-cell custom-cell mdl-cell--2-col') );
   
    if (this.videoPlaylist.length > 0) {
       //this.videoList = this.videoPlaylist;
       //this. .document.body.classList.add('test');
    }	    
  }
  
  updateCheckedOptions(option, idx, ischecked) : void {
    console.log(option,idx, ischecked);
    this.options[idx].checked = ischecked;
  }
  wtf() : void {
	  
	  if (this.videoList.length > 2) {
		  //swap
		  //alert('wtf this.videoList.length= '  this.videoList.length);
		  var temp = this.videoList[1];
		  this.videoList[1] = this.videoList[0];
		  this.videoList[0] = temp;
		  //this.videoList = this.videoPlaylist;
		  //this.videoList =[];
      //this.videosUpdated.emit([]);
      //console.log(this. input.nativeElement.value);
      var val = this.options[0].value;
      var check = this.options[1].checked;
      this.options.forEach(element => {
        console.log('di  option val = ', element); //, val, check );  
        
      });
      

      //let bbb = this.playlistSortbyService.test(this.videoList);

      //let current = this.youtubePlayer.getCurrentVideo();
      //alert(bbb);
	  }
	  
  }
}

