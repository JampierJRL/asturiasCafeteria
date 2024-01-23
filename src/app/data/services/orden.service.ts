import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IOrden } from "../interfaces/IOrden";

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LAS ORDENES
   * @returns
   */
  srvListaOrdenes(): Observable<IOrden[]> {

    return this.http.get<IOrden[]>(`${this.urlApi}/service/ordenes/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR ORDEN
   * @param data
   * @returns
   */
  srvCrearOrden(data: IOrden): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/ordenes/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR ORDEN
   * @param data
   * @returns
   */
  srvUpdateOrden(data: IOrden): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/ordenes/update/${data.codOrden}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR ORDEN
   * @param id
   * @returns
   */
  srvDeleteOrden(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/ordenes/delete`, { params: { 'orden': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
