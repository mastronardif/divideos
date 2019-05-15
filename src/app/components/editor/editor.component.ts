import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NotificationService } from '../../shared/services/notification.service';
import { PlaylistStoreService } from '../../shared/services/playlist-store.service';
import { CKEditorComponent } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
@Output() importPlaylist2 = new EventEmitter();
@Output() valueChange = new EventEmitter();
    
  public Editor = ClassicEditor;
  public thedoc: string;
  public videoPlaylist: any[] = [];

// [config]="{ toolbar: [ 'heading', '|', 'bold', 'italic' ] }"
// data="{{thedoc}}" 
public model = {
  editorData: '<p>Hello, world!</p>'
};

  constructor(private playlistService: PlaylistStoreService, private notificationService: NotificationService) { 
    this.model.editorData = 'this.dummy';
  }

  // public onChange( event: any ) { // npm install --save @types/ckeditor
  //public onChange( event: CKEditor5.EventInfo ) {
  //public onChange( event: CKEditor5.EventInfo<CKEditorComponent> ) {    
  public onChange( event: any ) {     
      ;//console.log( `ZZZZZZZZZZZZZZZ= ${event.editor.getData()}` );
  }

  ngOnInit () {
    this.thedoc = this.dummy; //'"Now is the <b>time for all </b> men to come to the aide of there country.';
  }

  closeDocument () {
    this.valueChange.emit({id: 'editorToggleClose'});
  }

  saveDocument () {
    this.notificationService.showNotification('saveDocument () {');
    console.log(`saveDocument () ${this.model.editorData}`);
    this.exportDocument();
  }

  public importPlaylist(videos: any): void {
    //let playlist: any = {};
    alert(': importPlaylist');
    //this.playlistService.importPlaylist(playlist);
    console.log(`editor:importPlaylist= ${videos}`)
    //let store = this.parse();
    //store.playlists = videos;
    //localStorage.setItem('this.ngxYTPlayer', JSON.stringify(store));
  }

  handleInputChange(e: any): void {
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    if (!file) {return};

    if (file.name.split('.').pop() !== 'json') {
      this.notificationService.showNotification('File not supported.');
      return;
    }

    let reader = new FileReader();
    let me = this;

    reader.readAsText(file);
    reader.onload = function (ev) {
      let list;
      try {
        console.log('ev= ', ev.target);
        //list = JSON.parse(ev.target['result']);
        list = ev.target['result'];        
      } catch (exc) {
        list = null;
      }
      if (!list || list.length < 1) {
        me.notificationService.showNotification('Playlist not valid.');
        return;
      }

      //
      console.log('\n\t**** * * * * ******** handleInputChange() 1');
      console.log('list= ', list);
      me.model.editorData = list;

      //
      //me.importPlaylist2.emit(list);
      me.notificationService.showNotification('Playlist imported.');
    }
  }

  exportDocument(): void {
    if (this.model.editorData.length < 1) {
      this.notificationService.showNotification('Nothing(Empty Document) to export.');
      //alert(`this.notificationService.showNotification('Nothing to export.');`);
      return;
    }
    let data = this.model.editorData; //JSON.stringify(this.model.editorData);
    let a = document.createElement('a');
    let file = new Blob([data], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'myoutline.json';
    a.click();
    this.notificationService.showNotification('Document exported.');
  }

  private dummy: string = `
  <figure class="table">
  <table>
      <tbody>
          <tr>
              <td>adsf</td>
              <td>&nbsp;</td>
          </tr>
          <tr>
              <td>&nbsp;</td>
              <td>asdf</td>
          </tr>
      </tbody>
  </table>
</figure>
<p>bucket II</p>
<figure class="table">
  <table>
      <tbody>
          <tr>
              <td>asdf</td>
              <td>f</td>
              <td>
                  <figure class="image"><img src="https://i.ytimg.com/vi/3kh6K_-a0c4/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLBQ31busH6BTfDNI1Z6nkTe21jzIw" alt=""></figure>
                  <p>f</p>
                  <figure class="image"><img src="https://i.ytimg.com/vi/hUvcWXTIjcU/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&amp;rs=AOn4CLBRqnyz9x7_EBJcmGyA2GKDmhAhCQ" alt=""></figure>
              </td>
              <td>f</td>
              <td>f</td>
          </tr>
      </tbody>
  </table>
</figure>
  `;
}
