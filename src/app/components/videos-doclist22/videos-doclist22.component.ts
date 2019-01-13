import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { YoutubeApiService  } from '../../shared/services/youtube-api.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { jaketoc } from '../../model/jake_toc';

@Component({
  selector: 'videos-doclist22',
  templateUrl: './videos-doclist22.component.html',
  styleUrls: ['./videos-doclist22.component.css'],
})

export class VideosdoclistComponent22 {
  @Input() leftPaneToggle;

  //title = 'x';
  toc = jaketoc;

  constructor(private data: DataService,
              private youtubeService: YoutubeApiService,
              private playlistSortbyService: PlaylistSortbyService) {
  }

  lpl(id): void {
    let newlist: any  = [{}];
    // newlist = this.playlistSortbyService.getPlayListFor('Jake.Mastronardi', id);
    // console.log(newlist);
    // this.data.changeMessage(newlist);
    console.log(`\n\n*************toc\n this.toc`);

    // this.playlistSortbyService.getPlaylistFor('Jake.Mastronardi', id)
    this. youtubeService.getPlaylistFor('Jake.Mastronardi', id)
      .subscribe(response => {
        response.subscribe(res => {
        const jsonRes = res;
        let res22 = jsonRes['items'];

        // fix the videoID issue.
        // i dont think you have to do this this.playlistSortbyService.fixPlaylist(res22);

        newlist = res22;
        this.data.changeMessage(newlist);
      });
    });
  }
}