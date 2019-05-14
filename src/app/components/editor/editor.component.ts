import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  
  public Editor = ClassicEditor;
  public thedoc: string;
// [config]="{ toolbar: [ 'heading', '|', 'bold', 'italic' ] }"
// data="{{thedoc}}" 
public model = {
  editorData: '<p>Hello, world!</p>'
};

  constructor() { 
    this.model.editorData = this.dummy;
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

  saveDocument () {
    console.log(`saveDocument () ${this.model.editorData}`);

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
