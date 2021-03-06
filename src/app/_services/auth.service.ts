import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  updateUser() {
    return this.http.get<any>(`${environment.apiUrl}/users/me`)
      .pipe(map(result => {
        const user: User = result.data;

        this.currentUserSubject.value.balance = result.data.value;

        return user;
      }));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/auth/signin`, { email, password })
      .pipe(map(result => {
        const user: User = result.data;
        user.token = result.token;

        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  register(user: User) {
    return this.http.post<any>(`${environment.apiUrl}/users`, user)
      .pipe(map(result => {
        const user: User = result.data;
        user.token = result.token;

        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
