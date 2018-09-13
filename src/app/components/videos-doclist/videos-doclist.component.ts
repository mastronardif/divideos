import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { YoutubePlayerService } from '../../shared/services/youtube-player.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'videos-doclist',
  templateUrl: './videos-doclist.component.html',
  styleUrls: ['./videos-doclist.component.css'],
})
export class VideosdoclistComponent {
  @Input() playlistToggle;
  @Input() videoPlaylist;
  @Input() playlistNames;
  @Input() repeat;
  @Input() shuffle;


  @Output() messageEvent = new EventEmitter<string>();

  constructor(
    private data: DataService,
    private playlistSortbyService: PlaylistSortbyService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService) {
    this.youtubePlayer.videoChangeEvent.subscribe(event => event ? this.playNextVideo() : false);
    }

    lpl(id): void {
      let newlist: any  = [{}];
      // newlist = this.playlistSortbyService.getPlayListFor('Jake.Mastronardi', id);
      // console.log(newlist);
      // this.data.changeMessage(newlist);

      this.playlistSortbyService.getPlaylistFor('Jake.Mastronardi', id)
      .subscribe(response => {
        const jsonRes = response;
        let res = jsonRes['items'];
        // fix the videoID issue.
        this.playlistSortbyService.fixPlaylist(res);

        newlist = res;
        this.data.changeMessage(newlist);
      });

  }

  importPlaylistAction(): void {
    let import_button = document.getElementById('import_button');
    import_button.click();
  }

  play(id: string): void {
    let videoText = 'None';
    this.videoPlaylist.forEach((video, index) => {
      if (video.id === id) {
        videoText = video.snippet.title;
      }
    });

    this.youtubePlayer.playVideo(id, videoText);
  }

  currentPlaying(id: string): boolean {
    return this.youtubePlayer.getCurrentVideo() === id;
  }

  removeFromPlaylist(video: Object): void {
    this.videoPlaylist.splice(this.videoPlaylist.indexOf(video), 1);
    this.playlistService.removeFromPlaylist(video);
  }

  playNextVideo(): void {
    let current = this.youtubePlayer.getCurrentVideo();
    let inPlaylist;

    if (this.repeat) {
      this.play(current);
      return;
    }

    this.videoPlaylist.forEach((video, index) => {
      if (video.id === current) {
        inPlaylist = index;
      }
    });

    if (inPlaylist !== undefined) {
      let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
      let playlistEl = document.getElementById('playlist');
      if (this.shuffle) {
        let shuffled = this.videoPlaylist[this.youtubePlayer.getShuffled(inPlaylist, this.videoPlaylist.length)];
        this.youtubePlayer.playVideo(shuffled.id, shuffled.snippet.title);
        playlistEl.scrollTop = document.getElementById(shuffled).offsetTop - 100;
      } else {
        if (this.videoPlaylist.length - 1 === inPlaylist) {
          this.youtubePlayer.playVideo(this.videoPlaylist[0].id, this.videoPlaylist[0].snippet.title);
          playlistEl.scrollTop = 0;
        } else {
          this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id, this.videoPlaylist[inPlaylist + 1].snippet.title)
          playlistEl.scrollTop = topPos - 100;
        }
      }
    }
  }
}
