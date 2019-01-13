import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';
//import {MatTreeFlattener } from '@angular/material/tree';
import {GoogleApiModule, GoogleApiService, GoogleAuthService, 
  NgGapiClientConfig, NG_GAPI_CONFIG, GoogleApiConfig} from 'ng-gapi';

// Components
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material';

import { TestComponent } from './components/test/test.component';
import { MainComponent } from './components/main/main.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideosSearchComponent } from './components/videos-search/videos-search.component';
import { VideosPlaylistComponent } from './components/videos-playlist/videos-playlist.component';
import { VideosdoclistComponent} from './components/videos-doclist/videos-doclist.component';
import { VideosdoclistComponent22 } from './components/videos-doclist22/videos-doclist22.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { VideosTagsComponent } from './components/videos-tags/videos-tags.component';
import { DialogContentExampleDialog } from './components/videos-tags/videos-tags.component';
import { SampleComponent }             from './components/sample/sample.component';
import { TagsComponent }             from './components/tags/tags.component';
// pipes
import { VideoLikesPipe } from './shared/pipes/video-likes.pipe';
import { VideoViewsPipe } from './shared/pipes/video-views.pipe';
import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { PlaylistItemNamePipe } from './shared/pipes/playlist-item-name.pipe';
import { NowPlayingNamePipe } from './shared/pipes/now-playing-name.pipe';
import { LazyScrollDirective } from './shared/directives/lazy-scroll/lazy-scroll.directive';

// Services
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { PlaylistStoreService } from './shared/services/playlist-store.service';
import { PlaylistSortbyService } from './shared/services/playlist-sortby.service';
import { NotificationService } from './shared/services/notification.service';
import { DataService } from './shared/services/data.service';
import { ModalService } from './shared/services/modal.service';
import { DomService } from './shared/services/dom.service';
import { UserService } from './shared/services/UserService';

import { BrowserNotificationService } from './shared/services/browser-notification.service';
//import { MatDialog, MatDialogModule } from '@angular/material';

var OAUTH2_CLIENT_ID = '838458623675-29k9sdcckggqc5p1b07uh7r4ap0rmec7.apps.googleusercontent.com';
var OAUTH2_SCOPES = [
  "https://www.googleapis.com/auth/youtube email"
 // "https://www.googleapis.com/auth/contacts.readonly"
];
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/people/v1/rest"];
var apiKey = 'AIzaSyBGbbhHE02G2YC1Uvopww3JNa_6PKVIn8w';

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
    VideosListComponent,
    VideosSearchComponent,
    VideoPlayerComponent,
    VideosPlaylistComponent,
    VideosdoclistComponent,
    VideosdoclistComponent22,
    SampleComponent,
    DialogContentExampleDialog,
    VideosTagsComponent,
    TagsComponent,

    // pipes
    PlaylistItemNamePipe,
    VideoLikesPipe,
    VideoViewsPipe,
    VideoDurationPipe,
    NowPlayingNamePipe,

    LazyScrollDirective
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
    MatCardModule
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
    BrowserNotificationService
  ],
  entryComponents: [
    SampleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
