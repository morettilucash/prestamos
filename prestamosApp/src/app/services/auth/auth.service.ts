import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Endpoint } from './../../endpoint';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Usuarios } from 'src/app/models/usuarios';
import { ToastsService } from '../toasts.service';
import { HttpOptions } from '../globales/httpOptions';
import * as jwt_decode from 'jwt-decode';

export const TOKEN: string = '_zD';
export let TOKEN_ORIGINAL: string = 'token_original';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public UrlRest: string = Endpoint.UrlRest + '/login';
  httpOptions = HttpOptions.httpOptions;

  isLoginSubject = new BehaviorSubject<boolean>(this.isLoggedIn())
  usuarioSubject = new BehaviorSubject<Usuarios>(this.returnUser());

  constructor(private http: HttpClient, private router: Router, private _toast: ToastsService) {

  }

  ngOnInit() {
  }

  public returnAsObs(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  public isLoggedIn(token?: string): boolean {
    if (!token) {
      token = sessionStorage.getItem(TOKEN);
    }
    if (!token) {
      return this.logout();
    }

    const date: Date = this.getTokenExpirationDate(token);

    if (date === undefined) {
      return true;
    }

    if (!(date.valueOf() > new Date().valueOf())) {
      return this.logout('Tu sesión expiró, ingresa nuevamente');
    } else {
      return true;
    }
  }

  public getUser(): Observable<Usuarios> {
    return this.usuarioSubject.asObservable();
  }

  public returnUser(): Usuarios {
    let u: Usuarios;
    let T: string = sessionStorage.getItem(TOKEN);
    if (T == null)
      return null;
    else
      u = jwt_decode(T);
    return u;
  }

  public returnIdUsuario(): Promise<number> {
    let u: Usuarios;
    let T: string = sessionStorage.getItem(TOKEN);
    return new Promise((resolve, reject) => {
      if (T == null)
        return null;
      else
        u = jwt_decode(T);
      resolve(u.id);
    });
  }

  public returnRole(): Promise<string> {
    let u: Usuarios;
    let T: string = sessionStorage.getItem(TOKEN);
    return new Promise((resolve, reject) => {
      if (T == null)
        return null;
      else
        u = jwt_decode(T);
      resolve(u.rol);
    });
  }

  public returnToken(): Promise<string> {
    let T: string = sessionStorage.getItem(TOKEN);
    return new Promise((resolve, reject) => {
      resolve(T);
    });
  }

  public login(credentials: any): void {
    this.http.post(`${this.UrlRest}`, credentials, this.httpOptions).subscribe(
      (data: any) => {
        console.log(data);
        
        if (!data.isLogged) {
          this.isLoginSubject.next(false)
          return;
        }
        else {
          const t = jwt_decode(data.token)
          const u: any = { id: t.id, nombre: t.nombre, role: t.role }

          sessionStorage.setItem(TOKEN, data.token);
          TOKEN_ORIGINAL = data.token;

          this.isLoginSubject.next(true);
          this.usuarioSubject.next(u)
          this.router.navigate(['/clientes'])
        }
      },
      err => {
        this._toast.errorToast(err.error.error)
        console.log('Error: ', err.error.error);
      }
    );
  }

  public logout(msg?: string): boolean {
    this.router.navigate(['/login'])
      .then(() => {
        sessionStorage.removeItem(TOKEN);
        if (msg)
          this._toast.errorToast(msg);
        this.isLoginSubject.next(false)
      })

    return false;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = jwt_decode(token);
    if (decoded.exp === undefined) {
      return null
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }


}
