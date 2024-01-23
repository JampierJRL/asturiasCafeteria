import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IDetalleOrden } from "../interfaces/IDetalleOrden";

@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS DETALLES ORDENES
   * @returns
   */
  srvListaDetalleOrden(): Observable<IDetalleOrden[]> {

    return this.http.get<IDetalleOrden[]>(`${this.urlApi}/service/detalleOrden/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR DETALLE ORDEN
   * @param data
   * @returns
   */
  srvCrearDetalleOrden(data: IDetalleOrden): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/detalleOrden/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR DETALLE ORDEN
   * @param data
   * @returns
   */
  srvUpdateDetalleOrden(data: IDetalleOrden): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/detalleOrden/update/${data.codDetalle}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR DETALLE ORDEN
   * @param id
   * @returns
   */
  srvDeleteDetalleOrden(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/detalleOrden/delete`, { params: { 'detalleOrden': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
