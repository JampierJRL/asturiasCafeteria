import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, throwError } from "rxjs";
import { IMesas } from "../interfaces/IMesas";

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LAS MESAS
   * @returns
   */
  srvListaMesas(): Observable<IMesas[]> {

    return this.http.get<IMesas[]>(`${this.urlApi}/service/mesas/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR MESA
   * @param data
   * @returns
   */
  srvCrearMesas(data: IMesas): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/mesas/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR MESA
   * @param data
   * @returns
   */
  srvUpdateMesas(data: IMesas): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/mesas/update/${data.codMesa}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR MESA
   * @param id
   * @returns
   */
  srvDeleteMesas(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/mesas/delete`, { params: { 'mesa': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
