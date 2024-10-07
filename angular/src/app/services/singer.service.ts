import { Injectable } from '@angular/core';
import { Singer } from '../model/singer.model';
import { Label } from '../model/label.model';
import { Image } from '../model/image.model';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SingerService {

  apiURL: string = 'http://localhost:8090/singers/api';

  singers : Singer[];
  singer!: Singer;

  constructor(private http: HttpClient, private authService : AuthService) { this.singers = []; }

    singersList (): Observable<Singer[]> {
      return this.http.get<Singer[]>(this.apiURL + '/allSingers');
    }

    addSinger ( al:Singer ): Observable<Singer> {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.post<Singer>(this.apiURL + '/addSinger', al, { headers: headers });
    }

    deleteSinger ( id: number ) {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.delete(this.apiURL + '/deleteSinger/' + id, { headers: headers });
    }

    getSingerById ( id : number ) : Observable<Singer> {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.get<Singer>(this.apiURL + '/singer/' + id, { headers: headers });
    }

    updateSinger ( al:Singer ): Observable<Singer> {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.put<Singer>(this.apiURL + '/updateSinger', al, { headers: headers });
    }

    labelsList (): Observable<Label[]> {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.get<Label[]>(this.apiURL + '/labels/allLabels', { headers: headers });
    }

    rechrcheParLabel ( idLabel : number ) : Observable< Singer[] > {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.get<Singer[]>(this.apiURL + '/label/' + idLabel, { headers: headers });
    }

    addLabel ( lab:Label ): Observable<Label> {
      let token = this.authService.getToken();
      token = "Bearer " + token;
      let headers = new HttpHeaders({'Authorization': token});
      return this.http.post<Label>(this.apiURL + '/labels/addLabel', lab, { headers: headers });
    }

    uploadImage(file: File, filename: string): Observable<Image>{
      const imageFormData = new FormData();
      imageFormData.append('image', file, filename);
      const url = `${this.apiURL + '/image/upload'}`;
      return this.http.post<Image>(url, imageFormData);
    }

      loadImage(id: number): Observable<Image> {
      const url = `${this.apiURL + '/image/get/info'}/${id}`;
      return this.http.get<Image>(url);
    }
  }
