import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClient, HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTooltipModule } from '@angular/material/tooltip';

// Components
import { AppComponent } from './app.component';
import { MainListComponent } from './main-list/main-list.component';
import {MatCardModule} from '@angular/material/card';

import { TestComponent } from './components/test/test.component';
import { MainComponent } from './components/main/main.component';
import { VideosListComponent } from './components/videos-list/videos-list.component';
import { VideosSearchComponent } from './components/videos-search/videos-search.component';
import { VideosPlaylistComponent } from './components/videos-playlist/videos-playlist.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';

// pipes
import {VideoLikesPipe} from './shared/pipes/video-likes.pipe';
import {VideoViewsPipe} from './shared/pipes/video-views.pipe';
import {VideoDurationPipe} from './shared/pipes/video-duration.pipe';
import {PlaylistItemNamePipe} from './shared/pipes/playlist-item-name.pipe';
import { NowPlayingNamePipe } from './shared/pipes/now-playing-name.pipe';
import { LazyScrollDirective } from './shared/directives/lazy-scroll/lazy-scroll.directive';

// Services
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { PlaylistStoreService } from './shared/services/playlist-store.service';
import { PlaylistSortbyService } from './shared/services/playlist-sortby.service';
import { NotificationService } from './shared/services/notification.service';
import { BrowserNotificationService } from './shared/services/browser-notification.service';


@NgModule({
  declarations: [    

    //ReactiveFormsModule,
    AppComponent, 
    MainComponent,    

      TestComponent,
    MainListComponent,
    VideosListComponent,
    VideosSearchComponent,    
    VideoPlayerComponent,
    VideosPlaylistComponent,
    // pipes
    PlaylistItemNamePipe,
    VideoLikesPipe,
    VideoViewsPipe,
    VideoDurationPipe,
    NowPlayingNamePipe,
    
    LazyScrollDirective
  ],
  imports: [
    BrowserAnimationsModule,
    MatTooltipModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule   
  ],
  providers: [HttpClientModule,
    PlaylistSortbyService,
    PlaylistStoreService,
    YoutubePlayerService,
    NotificationService,
    BrowserNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
