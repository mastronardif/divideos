import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import { map, finalize } from 'rxjs/operators';
// import { Http, Response } from '@angular/http';
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';

// import { NotificationService } from './notification.service';
 import { YOUTUBE_API_KEY } from '../constants';
//import { UrlResolver } from "../../../../node_modules/@angular/compiler";

 @Injectable({providedIn: 'root'})
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

    searchVideos(query: string): Observable<any> {  
      const url = this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results +
                  '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';
    
      console.log(`searchVideos: url=${url}`);
      return this
              .http
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

                    console.log(ids);
                    console.log(`ids= ${ids}`);
                    return this.getVideos(ids);
                })                
            );
    }
//   searchVideos(query: string): Promise<any> {
//     const url = this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results +
//       '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';
	  
// 	  //url= "https://www.youtube.com/user/mastronardif/videos";
// 	  //alert ('url='+ url);

//     return this.http.get(url)
//       .map(response => {
//         let jsonRes = response.json();
// 		//console.log(jsonRes);
		
//         let res = jsonRes['items'];
//         this.lastQuery = query;
//         this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

//         let ids = [];

//         res.forEach((item) => {
//           ids.push(item.id.videoId);
//         });

//         return this.getVideos(ids);
//       })
//       .toPromise()
//       .catch(this.handleError)
//   }

//   searchNext(): Promise<any> {
//     const url = this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken +
//       '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';

//     return this.http.get(url)
//       .map(response => {
//         let jsonRes = response.json();
//         let res = jsonRes['items'];
//         this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
//         let ids = [];

//         res.forEach((item) => {
//           ids.push(item.id.videoId);
//         });

//         return this.getVideos(ids);
//       })
//       .toPromise()
//       .catch(this.handleError)
//   }

searchNext(): Promise<any> {
  return null;
}

getVideos(ids): Observable<any> {
  const url = this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results +
              '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY;
  console.log(`url= ${url}`);
  return this
          .http
          //.get(`${this.path}/api/courses`)
          .get(url)
          .pipe(
            map(results => results)            
            //   {
            //   let jsonRes = results;
            //   let res = jsonRes['items'];
            //   console.log(`jsonRes['items']= ${jsonRes['items']}`);
            //   //return res;
            // }
        );
      //)
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
