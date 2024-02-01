import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ISucursales } from "../interfaces/ISucursales";

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS SUCURSALES
   * @returns
   */
  srvListaSucursales(): Observable<ISucursales[]> {

    return this.http.get<ISucursales[]>(`${this.urlApi}/service/sucursales/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR SUCURSAL
   * @param data
   * @returns
   */
  srvCrearSucursal(data: ISucursales): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/sucursales/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR SUCURSAL
   * @param data
   * @returns
   */
  srvUpdateSucursal(data: ISucursales): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/sucursales/update/${data.codSucursal}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR SUCURSAL
   * @param id
   * @returns
   */
  srvDeleteSucursal(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/sucursales/delete`, { params: { 'sucursal': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
