import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ITipoComprobante } from "../interfaces/ITipoComprobante";

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS TIPO DE COMPROBANTES
   * @returns
   */
  srvListaTipoComprobantes(): Observable<ITipoComprobante[]> {

    return this.http.get<ITipoComprobante[]>(`${this.urlApi}/service/tipoComprobante/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR TIPO DE COMPROBANTE
   * @param data
   * @returns
   */
  srvCrearTipoComprobante(data: ITipoComprobante): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/tipoComprobante/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR TIPO DE COMPROBANTE
   * @param data
   * @returns
   */
  srvUpdateTipoComprobante(data: ITipoComprobante): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/tipoComprobante/update/${data.codTipoComprobante}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR TIPO DE COMPROBANTE
   * @param id
   * @returns
   */
  srvDeleteTipoComprobante(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/tipoComprobante/delete`, { params: { 'tipocomprobante': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
