import { Component, Input,  Output, EventEmitter } from '@angular/core';
import { PlaylistSortbyService } from '../../shared/services/playlist-sortby.service';
import { DataService } from '../../shared/services/data.service';


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
  title = 'x';
   
  public tree = [
    {
      title: 'Basketball',
      children: []
    },
    {
      title: 'Football',
      children: [
        {
          title: 'Liga BBVA',
          children: []
        },
        {
          title: 'Seria A',
          children: [
            {
              title: 'AC Milan',
              children: []
            },
            {
              title: 'Juventus',
              children: []
            },
            {
              title: 'Internazionale Milan',
              children: [
                {
                  title: 'Main Team',
                  children: []
                },
                {
                  title: 'Youth Team',
                  children: []
                },
              ]
            },
            {
              title: 'Roma',
              children: [
                {
                  title: 'Main Team',
                  children: []
                },
              ]
            },
          ]
        },
        {
          title: 'Premier League',
          children: [
            {
              title: 'Chelsea',
              children: []
            },
            {
              title: 'Man United',
              children: []
            },
            {
              title: 'Man City',
              children: []
            },
          ]
        },
      ]
    },
  ];  

}