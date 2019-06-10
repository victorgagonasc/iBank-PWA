import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  transfer(identification, value) {
    return this.http.post<any>(`${environment.apiUrl}/account/transfer`, { identification, value });
  }
}
