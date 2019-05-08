import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideosPlaylistComponent22 } from "./components/videos-playlist22/videos-playlist.component22";
import { TestComponent } from "./components/test/test.component";
import { SampleComponent } from "./components/sample/sample.component";
import { VideoTagListComponent } from "./components/video-taglist/video-taglist.component";

const routes: Routes = [
  { path: 'newoutline', component: VideosPlaylistComponent22 },
  { path: 'taglist', component: VideoTagListComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'test', component: TestComponent }
];

@NgModule({ 
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]
})

export class AppRoutingModule { }