import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { map,  finalize  } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

// import { NotificationService } from './notification.service';
import { YOUTUBE_API_KEY } from '../constants';
//import { UrlResolver } from "../../../../node_modules/@angular/compiler";

@Injectable({ providedIn: 'root' })
export class YoutubeApiService {
  path = 'http://localhost:3000/town';
  base_url = 'https://www.googleapis.com/youtube/v3/';
  max_results = 50;

  public nextToken: string;
  public lastQuery: string;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this
      .http
      .get(`${this.path}/api/courses`)
      .pipe(
        map(res => res)
      );
  }


  // begin 0//1/18
  getPlaylistFor(user: string, id: string): Observable<any> {
    console.log(' getPlaylistFor: ', 'app\shared\services\youtube-api.service.ts: getPlaylistFor', id);
    const maxResults = 20;

    const url = this.base_url + 'playlistItems?playlistId=' + id + '&maxResults=' + maxResults +
    '&part=snippet%2CcontentDetails&key=' + YOUTUBE_API_KEY;

    return this.http
    .get(url)
    .pipe(
      map(response => {
        let jsonRes = response;
        //console.log(jsonRes);  
        let res = jsonRes['items'];
        // this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];
        res.forEach((item) => {
          //ids.push(item.id.videoId);
          ids.push(item.snippet.resourceId.videoId);
        });

        console.log(ids.length);
        //console.log(`ids= ${ids}`);                    
        return this.getVideos(ids);
      })
    ).catch((err: HttpErrorResponse) => {
      // simple logging, but you can do a lot more, see below
      console.error('WTF. An error occurred: ', err.error);
      console.log('trying to rerutn and empty');
      return Observable.of(new HttpResponse({body: [{name: "Default value"}]}));
      });
  }
  // end 10/1/18

  // search22
  searchVideos22(query: string): Observable<any> {
    const url = this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';

    console.log(`searchVideos: url=${url}`);
    return this.http
      .get(url)
      .pipe(
        map(response => {
          let jsonRes = response;
          //console.log(jsonRes);  
          let res = jsonRes['items'];
          this.lastQuery = query;
          this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

          let ids = [];
          res.forEach((item) => {
            ids.push(item.id.videoId);
          });

          console.log(ids.length);
          //console.log(`ids= ${ids}`);                    
          return this.getVideos(ids);
        })
      );
  }


  searchNext(): Observable<any> {
    const url = this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken +
      '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';

    console.log(`searchNext: url=${url}`);
    return this.http
      .get(url)
      .pipe(
        map(response => {
          let jsonRes = response;
          //console.log(jsonRes);  
          let res = jsonRes['items'];
          //this.lastQuery = query;
          this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

          let ids = [];
          res.forEach((item) => {
            ids.push(item.id.videoId);
          });

          console.log(ids);
          console.log(`ids= ${ids}`);
          return this.getVideos(ids);
        })
      );
  }


  getVideos(ids): Observable<any> {
    const url = this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY;
    console.log(`getVideos(${ids.join(',')}): url= ${url}`);
    return this
      .http
      //.get(`${this.path}/api/courses`)
      .get(url)
      /***         
      .pipe(
        map(results =>             
          {
          let jsonRes = results;
          let res = jsonRes['items'];
          console.log(`jsonRes['items']= ${jsonRes['items']}`);
          return res;
        }
      )) ****/
      ;
    // )
  }
  //   getVideos(ids): Promise<any> {
  //     const url = this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results +
  //       '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY;

  //     return tUrlResolver
  //       .map(results => {
  //         return results.json()['items'];
  //       })
  //       .toPromise()
  //       .catch(this.handleError)
  //   }

  //   private handleError(error: Response | any) {
  //     let errMsg: string;
  //     if (error instanceof Response) {
  //       const body = error.json() || '';
  //       const err = body.error || JSON.stringify(body);
  //       errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //     } else {
  //       errMsg = error.message ? error.message : error.toString();
  //     }

  //     this.notificationService.showNotification(errMsg);
  //     return Promise.reject(errMsg);
  //   }
}
