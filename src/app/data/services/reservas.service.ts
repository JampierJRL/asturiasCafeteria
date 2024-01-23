import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IReservas } from "../interfaces/IReservas";

@Injectable({
  providedIn: 'root'
})

export class ReservaService {
  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA DE PRODUCTOS
   * @returns
   */
  srvListaReservas(): Observable<IReservas[]> {
    return this.http.get<IReservas[]>(`${this.urlApi}/service/reservas/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**CREAR PRODUCTOS
   * @param data
   * @returns
   */
  srvCrearReserva(data: IReservas): Observable<any>{

    return this.http.post<any>(`${this.urlApi}/service/reservas/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e)})
    );
  }

  /**
   * ACTUALIZAR PRODUCTOS
   * @param data
   * @returns
   */
  srvUpdateReserva(data: IReservas): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/reservas/update/${data.codReserva}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }


  /**
   * ELIMINAR PRODUCTO
   * @param id
   * @return
   */
  srvDeleteReserva(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/service/reservas/delete`,{ params: { 'producto': id } }).pipe(
      catchError((e:any)=> { return throwError(()=>e)})
    );
  }
}
