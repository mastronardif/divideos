import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';
import { jaketoc } from '../../model/jake_toc';

@Component({
  selector: 'videos-doclist22',
  templateUrl: './videos-doclist22.component.html',
  styleUrls: ['./videos-doclist22.component.css'],
})

export class VideosdoclistComponent22 {
  @Input() playlistToggle;
  @Input() videoPlaylist;
  @Input() playlistNames;
  @Input() repeat;
  @Input() shuffle;
  //title = 'x';
  toc = jaketoc;

  constructor(private data: DataService, private playlistSortbyService: PlaylistSortbyService) {
  }

  lpl(id): void {
    let newlist: any  = [{}];
    // newlist = this.playlistSortbyService.getPlayListFor('Jake.Mastronardi', id);
    // console.log(newlist);
    // this.data.changeMessage(newlist);
    console.log(`\n\n*************toc\n this.toc`);

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
}