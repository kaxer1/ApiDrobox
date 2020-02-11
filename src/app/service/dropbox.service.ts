import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DropboxService {

  accessToken: any;
  folderHistory: any = [];
  appKey: any;
  redirectURI: any;
  url: any;

  constructor(private http: HttpClient, public iab: InAppBrowser, private router: Router) {
    //OAuth
    this.appKey = 'lw7jbwikqlu83tc';
    this.redirectURI = 'http://localhost:8100/home';
    this.url = 'https://www.dropbox.com/1/oauth2/authorize?client_id=' + this.appKey + '&redirect_uri=' + this.redirectURI + '&response_type=token';
  }

  getUserInfo(query?: string) {
    this.accessToken = query;
    let url = 'https://api.dropboxapi.com/2/users/get_current_account';
    let headers = new HttpHeaders({
      Authorization: `Bearer ${query}`,
      'Content-Type': 'application/json'
    });
    console.log(headers, "este es el query");
    // console.log(headers);
    return this.http.post(url, "null", { headers }).pipe(
      map(data => data));

  }

  descargar(path) {

    let folderPath = {
      path: path,
    };

    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/octet-stream',
      "Dropbox-API-Arg": `${JSON.stringify(folderPath)}`
    });
    

    return this.http.post('https://content.dropboxapi.com/2/files/download', undefined, { headers: headers , responseType: 'blob' })
      .pipe(
        map(data => console.log(data))
      );

  }

  getFolders(path?) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.accessToken}`,
      'Content-Type': 'application/json'
    });
    console.log(this.accessToken, "si llega al getFolder");
    let folderPath;

    if (typeof (path) == "undefined" || !path) {
      folderPath = {
        path: ""
      };
    } else {
      folderPath = {
        path: path
      };
      if (this.folderHistory[this.folderHistory.length - 1] != path) {
        this.folderHistory.push(path);
      }
    }

    return this.http.post('https://api.dropboxapi.com/2-beta-2/files/list_folder', JSON.stringify(folderPath), { headers: headers })
      .pipe(
        map(data => data['entries'])
      );

  }

  goBackFolder() {
    if (this.folderHistory.length > 0) {

      this.folderHistory.pop();
      let path = this.folderHistory[this.folderHistory.length - 1];

      return this.getFolders(path);
    }
    else {
      return this.getFolders();
    }
  }


  login() {

    return new Promise((resolve, reject) => {

      let browser = this.iab.create(this.url, '_blank');

      let listener = browser.on('loadstart').subscribe((event: any) => {

        //Check the redirect uri
        if (event.url.indexOf(this.redirectURI) > -1) {
          listener.unsubscribe();
          browser.close();
          this.router.navigate(['/home'])
          let token = event.url.split('=')[1].split('&')[0];
          // this.accessToken = token;
          console.log(token, "este es el tocken access");
          resolve(event.url);
        } else {
          reject("Could not authenticate");
        }

      });

    });

  }
}
