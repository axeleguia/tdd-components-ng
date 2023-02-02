import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Homes } from '../components/homes/homes';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getHomes$(): Observable<Homes[]> {
    return this.httpClient.get<Homes[]>('assets/homes.json');
  }

  bookHome$() {
    return this.httpClient.post('http://www.mocky.io/v2/5d674012330000f9ae44a00e', {});
  }

}
