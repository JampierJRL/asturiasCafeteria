import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ITipoPago } from "../interfaces/ITipoPago";

@Injectable({
  providedIn: 'root'
})
export class TipoPagoService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS TIPOS DE PAGOS
   * @returns
   */
  srvListaTipoPago(): Observable<ITipoPago[]> {

    return this.http.get<ITipoPago[]>(`${this.urlApi}/service/tipopagos/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR TIPOS DE PAGO
   * @param data
   * @returns
   */
  srvCrearTipoPago(data: ITipoPago): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/tipopagos/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR TIPOS DE PAGO
   * @param data
   * @returns
   */
  srvUpdateTipoPago(data: ITipoPago): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/tipopagos/update/${data.codTipoPago}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR TIPOS DE PAGO
   * @param id
   * @returns
   */
  srvDeleteTipoPago(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/tipopagos/delete`, { params: { 'tipoPago': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
