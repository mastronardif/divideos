import { Component, OnInit, Input,  Output, EventEmitter } from '@angular/core';
import { YoutubeApiService  } from '../../shared/services/youtube-api.service';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { jaketoc } from '../../model/jake_toc';

@Component({
  selector: 'app-myplaylist',
  templateUrl: './appmyplaylist.component.html',
  styleUrls: ['./appmyplaylist.component.css']
})
export class MyPlaylistComponent implements OnInit {

  //title = 'x';
  //toc = jaketoc;
  public gData: any; 

  constructor(private data: DataService,
              private youtubeService: YoutubeApiService,
              private playlistSortbyService: PlaylistSortbyService) {
  }
  
    ngOnInit() {
    let wtf = this.data.getOption();
    this.gData = wtf;

    console.log('\t FM Test.: wtf =', wtf);


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