import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { YoutubeApiService  } from '../../shared/services/youtube-api.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { jaketoc } from '../../model/jake_toc';

@Component({
  selector: 'videos-doclist33',
  templateUrl: './videos-doclist33.component.html',
  styleUrls: ['./videos-doclist33.component.css']
})
export class VideosDoclist33Component {

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
    // id = id || "PLaaxGO6E_rXcejHAW3Rg2u6EWLv6GjZ9K";
    console.log(`\n\n******333******* id(${id}) toc`);

    // this.playlistSortbyService.getPlaylistFor('Jake.Mastronardi', id)
    
    this. youtubeService.getPlaylistFor('Jake.Mastronardi', id)
      .subscribe(response => {
        response.subscribe(res => {
        const jsonRes = res;
        let res22 = jsonRes['items'];

        newlist = res22;
        this.data.changeMessage(newlist);
      });
    });
  }
}