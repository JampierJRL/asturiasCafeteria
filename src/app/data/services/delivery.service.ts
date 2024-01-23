import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IDelivery } from "../interfaces/IDelivery";

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS DELIVERYS
   * @returns
   */
  srvListaDelivery(): Observable<IDelivery[]> {

    return this.http.get<IDelivery[]>(`${this.urlApi}/service/delivery/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR DELIVERY
   * @param data
   * @returns
   */
  srvCrearDelivery(data: IDelivery): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/delivery/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR DELIVERY
   * @param data
   * @returns
   */
  srvUpdateDelivery(data: IDelivery): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/delivery/update/${data.codDelivery}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR DELIVERY
   * @param id
   * @returns
   */
  srvDeleteDelivery(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/delivery/delete`, { params: { 'delivery': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
