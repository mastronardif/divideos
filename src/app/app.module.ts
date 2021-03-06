import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
//import {MatTreeFlattener } from '@angular/material/tree';
import {GoogleApiModule, GoogleApiService, GoogleAuthService, 
  NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig} from 'ng-gapi';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Components
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material';

import { LeftPaneComponent } from './components/left-pane/left-pane.component';
import { EditorComponent } from './components/editor/editor.component';
import { TestComponent } from './components/test/test.component';
import { TestRxComponent } from './components/test-rx/test-rx.component';
import { MainComponent } from './components/main/main.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideosSearchComponent } from './components/videos-search/videos-search.component';
import { VideosDoclist33Component } from './components/videos-doclist33/videos-doclist33.component';
import { VideosPlaylistComponent } from './components/videos-playlist/videos-playlist.component';
import { VideosdoclistComponent} from './components/videos-doclist/videos-doclist.component';
import { VideosdoclistComponent22 } from './components/videos-doclist22/videos-doclist22.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { DialogContentExampleDialog } from './components/videos-tags/videos-tags.component';
import { SampleComponent } from './components/sample/sample.component';
import { TagsComponent } from './components/tags/tags.component';
import { TreeTagsComponent } from './components/apptreetags/treetags.component';
import { MyPlaylistComponent } from './components/appmyplaylist/appmyplaylist.component';

import { VideosTagsComponent } from './components/videos-tags/videos-tags.component';
import { VideoTagListComponent }  from './components/video-taglist/video-taglist.component';

// pipes
import { VideoLikesPipe } from './shared/pipes/video-likes.pipe';
import { VideoViewsPipe } from './shared/pipes/video-views.pipe';
import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { PlaylistItemNamePipe } from './shared/pipes/playlist-item-name.pipe';
import { NowPlayingNamePipe } from './shared/pipes/now-playing-name.pipe';
import { PlaylistItemDragDataPipe } from './shared/pipes/playlist-item-dragdata.pipe';
import { LazyScrollDirective } from './shared/directives/lazy-scroll/lazy-scroll.directive';
import { DraggableDirective } from './shared/directives/draggable/draggable.directive';

// Services
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { PlaylistStoreService } from './shared/services/playlist-store.service';
import { PlaylistSortbyService } from './shared/services/playlist-sortby.service';
import { NotificationService } from './shared/services/notification.service';
import { DataService } from './shared/services/data.service';
import { ModalService } from './shared/services/modal.service';
import { DomService } from './shared/services/dom.service';
import { UserService } from './shared/services/UserService';
import { DragService } from './shared/services/drag.service';

import { BrowserNotificationService } from './shared/services/browser-notification.service';
import { AppRoutingModule } from './app-routing.module';
//import { MatDialog, MatDialogModule } from '@angular/material';

var OAUTH2_CLIENT_ID = '838458623675-29k9sdcckggqc5p1b07uh7r4ap0rmec7.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  "https://www.googleapis.com/auth/youtube email"
 // "https://www.googleapis.com/auth/contacts.readonly"
];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
var apiKeyFUCK = 'AIzaSyBGbbhHE02G2YC1Uvopww3JNa_6PKVIn8w';

let gapiClientConfig: NgGapiClientConfig = {
  client_id: OAUTH2_CLIENT_ID,
  discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4",
                  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest",
                  "https://www.googleapis.com/discovery/v1/apis/people/v1/rest"
],
  scope: [
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube email",
      "https://www.googleapis.com/auth/analytics.readonly",
      "https://www.googleapis.com/auth/analytics"
  ].join(" ")
};

@NgModule({
  declarations: [

    AppComponent,
    MainComponent,

    TestComponent,
    EditorComponent,
    TestRxComponent,
    LeftPaneComponent,
    VideosListComponent,
    VideosSearchComponent,
    VideoPlayerComponent,    
    VideosPlaylistComponent,

    VideosdoclistComponent,
    VideosdoclistComponent22,
    VideosDoclist33Component,
    
    SampleComponent,
    DialogContentExampleDialog,
    VideosTagsComponent,
    TagsComponent,
    TreeTagsComponent,
    MyPlaylistComponent,
    VideoTagListComponent,

    // pipes
    PlaylistItemNamePipe,
    VideoLikesPipe,
    VideoViewsPipe,
    VideoDurationPipe,
    NowPlayingNamePipe,
    PlaylistItemDragDataPipe,

    LazyScrollDirective,
    DraggableDirective
  ],
  imports: [
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),

    BrowserAnimationsModule,
    MatTooltipModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    NgxChartsModule,
    CKEditorModule,
    AppRoutingModule
  ],
  providers: [HttpClientModule,
    ModalService,
    DomService,
    DataService,
    PlaylistSortbyService,
    PlaylistStoreService,
    YoutubePlayerService,
    NotificationService,
    UserService,
    BrowserNotificationService,
    DragService
  ],
  entryComponents: [
    SampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
