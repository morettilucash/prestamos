import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoint } from '../endpoint';
import { Observable, Subject } from 'rxjs';
import { Clientes } from '../models/Clientes';
import { Router } from '@angular/router';
import { HttpOptions } from './globales/httpOptions';
import { map, catchError } from 'rxjs/operators';
import { HandleErrorService } from './globales/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private UrlRestS = Endpoint.UrlRest + '/clientes';
  private UrlRest = Endpoint.UrlRest + '/cliente';

  httpOptions = HttpOptions.httpOptions;
  private clientes: Clientes[] = null;


  user: Clientes;
  clienteSubject = new Subject<Clientes>();
  hideFormSubject = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private he: HandleErrorService,
    private router: Router) {
  }

  // Clientes
  // =======================================
  public passUser(user: Clientes): void {
    this.user = user;
    this.returnUser();
  }

  public returnUser() {
    return this.clienteSubject.next(this.user);
  }

  public obsUser(): Observable<Clientes> {
    return this.clienteSubject.asObservable();
  }

    public obsForm(): Observable<boolean> {
    return this.hideFormSubject.asObservable();
  }

  public hide(state: boolean) {
    return this.hideFormSubject.next(state);
  }
  // Form
  // =======================================
  // public obsForm(): Observable<boolean> {
  //   return this.hideFormSubject.asObservable();
  // }

  // public hide(state: boolean) {
  //   return this.hideFormSubject.next(state);
  // }
  // =======================================
  public getPaginatedByTxt(size: number, nro: number, attr: string, txt: string): Observable<Clientes[]> {
    let params = new HttpParams()
      .set('pageSize', size.toString())
      .set('pageNro', nro.toString())
      .set('attr', attr)
      .set('filter', txt)
    return this.http.get<Clientes[]>(`${this.UrlRestS}/paginado`, { params })
      .pipe(
        map(res => { return <Clientes[]>res['clientes'] }),
        catchError(this.he.handleError)
      );
  }

  //  ====================================================================================
  public getAll() {
    console.log('Endpoint.UrlRest SERVICE', Endpoint.UrlRest);
    return this.http.get<Clientes[]>(`${this.UrlRestS}`, this.httpOptions)
      .pipe(
        map(res => { return <Clientes[]>res }),
        catchError(this.he.handleError)
      );
  }

  public update(user: Clientes): Observable<Clientes> {
    return this.http.put<Clientes>(`${this.UrlRest}/${user.id}`, user, this.httpOptions)
      .pipe(
        map(res => { return <Clientes>res }),
        catchError(this.he.handleError)
      );
  }

  public post(user: Clientes): Observable<Clientes> {
    return this.http.post<Clientes>(`${this.UrlRestS}`, user, this.httpOptions)
      .pipe(
        map(res => { return <Clientes>res }),
        catchError(this.he.handleError)
      );
  }

  public delete(id: number): Observable<Clientes> {
    return this.http.delete<Clientes>(`${this.UrlRest}/${id}`, this.httpOptions)
      .pipe(
        map(res => { return <Clientes>res; }),
        catchError(this.he.handleError)
      );
  }

}
