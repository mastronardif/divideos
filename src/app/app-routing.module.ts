import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosDoclist33Component } from "./components/videos-doclist33/videos-doclist33.component";

import { TestComponent } from "./components/test/test.component";
//import { SampleComponent } from "./components/sample/sample.component";
import { TreeTagsComponent } from "./components/apptreetags/treetags.component";
import { MyPlaylistComponent } from "./components/appmyplaylist/appmyplaylist.component";
//import { TestRxComponent } from "./components/test-rx/test-rx.component";

import { VideoTagListComponent } from "./components/video-taglist/video-taglist.component";
import { EditorComponent } from './components/editor/editor.component';

const routes: Routes = [
  { path: 'newoutline', component: EditorComponent },
  { path: 'aldooutline', component: VideosDoclist33Component },
  { path: 'alltags', component: VideoTagListComponent },
  { path: 'map1', component: TreeTagsComponent },
  { path: 'myplaylists', component: MyPlaylistComponent },  
  //{ path: 'sample', component: SampleComponent },
  //{ path: 'testrx', component: TestRxComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }