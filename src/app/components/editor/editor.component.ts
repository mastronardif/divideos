import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor5, CKEditorComponent } from '@ckeditor/ckeditor5-angular';
//import * as from '@ckeditor/ckeditor5-utils';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnInit {
  
  public Editor = ClassicEditor;
  public thedoc: string;


  constructor() { }

  // public onChange( event: any ) { // npm install --save @types/ckeditor
  //public onChange( event: CKEditor5.EventInfo ) {
  //public onChange( event: CKEditor5.EventInfo<CKEditorComponent> ) {    
  public onChange( event: any ) {     
      console.log( `ZZZZZZZZZZZZZZZ= ${event.editor.getData()}` );
  }

  ngOnInit () {
    this.thedoc = this.dummy; //'"Now is the <b>time for all </b> men to come to the aide of there country.';

  }

  private dummy: string = `
  <p>
    "Now is the <strong>time f</strong>or all me<i>n to come </i>to the aide of there<strong>
 </strong>ddd<strong>ddddd</strong> ccccccountry.<strong>ddddd</strong></p>
<p>asdfas</p>
<h2>fasfadfasfdasf</h2>
<figure class="table">
    <table>
        <tbody>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
            </tr>
        </tbody>
    </table>
</figure>
<p><strong>asdf</strong></p>
<p>asdf</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
  `;
}
