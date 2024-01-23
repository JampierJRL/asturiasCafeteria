import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ITipoConsumo } from "../interfaces/ITipoConsumo";

@Injectable({
  providedIn: 'root'
})
export class TipoConsumoService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS TIPOS DE CONSUMO
   * @returns
   */
  srvListaTipoConsumo(): Observable<ITipoConsumo[]> {

    return this.http.get<ITipoConsumo[]>(`${this.urlApi}/service/tipoconsumos/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR TIPO DE CONSUMO
   * @param data
   * @returns
   */
  srvCrearTipoConsumo(data: ITipoConsumo): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/tipoconsumos/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR TIPO DE CONSUMO
   * @param data
   * @returns
   */
  srvUpdateTipoConsumo(data: ITipoConsumo): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/tipoconsumos/update/${data.codTipoconsumo}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR TIPO DE CONSUMO
   * @param id
   * @returns
   */
  srvDeleteTipoConsumo(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/tipoconsumos/delete`, { params: { 'tipoconsumo': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
