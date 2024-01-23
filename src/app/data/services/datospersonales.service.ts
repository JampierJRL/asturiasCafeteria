import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { IDatosPersonales } from "../interfaces/IDatosPersonales";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatosPersonalesService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS DATOS PERSONALES
   * @returns
   */
  srvListaDatosPersonales(): Observable<IDatosPersonales[]> {

    return this.http.get<IDatosPersonales[]>(`${this.urlApi}/service/datosPersonales/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR DATOS PERSONALES
   * @param data
   * @returns
   */
  srvCrearDatosPersonales(data: any): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/datosPersonales/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR DATOS PERSONALES
   * @param data
   * @returns
   */
  srvUpdateDatosPersonales(data: any): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/datosPersonales/update/${data.codPersona}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR DATOS PERSONALES
   * @param id
   * @returns
   */
  srvDeleteDatosPersonales(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/datosPersonales/delete`, { params: { 'datosPersonales': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
