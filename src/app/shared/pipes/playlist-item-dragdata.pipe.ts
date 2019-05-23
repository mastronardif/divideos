import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playlistItemDragData'
})

export class PlaylistItemDragDataPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {
    // const dots = '...';

    // if (value && value.length > 65) {
    //   value = value.substring(0, 62) + dots;
    // }
    // return `draind the sqampe ${value.snippet.title}`;
    //return {fuck: 'you'}; //value;
    const i = value.id;
    let myDragableObjects33  = {
      data: {
        id: i,
        payload: `<figure class="image">
        <img src="${value.snippet.thumbnails.default.url}" alt="">
        </figure>
        <a href="https://www.youtube.com/watch?v=${i}}">${value.snippet.title}</a>        
        `,
        name: 'My Draggable - ' + i,
        currentColumn: i,
        payloadType: 'Free Wille'
      }
    };
    return myDragableObjects33;
  }
}
