import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, throwError } from 'rxjs';
import { IProducto } from '../interfaces/IProducto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {
  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA DE PRODUCTOS
   * @returns
   */
  srvListaProducto(): Observable<IProducto[]> {
    return this.http.get<IProducto[]>(`${this.urlApi}/service/productos/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**CREAR PRODUCTOS
   * @param data
   * @returns
   */
  srvCrearProducto(data: IProducto): Observable<any>{

    return this.http.post<any>(`${this.urlApi}/service/productos/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e)})
    );
  }

  /**
   * ACTUALIZAR PRODUCTOS
   * @param data
   * @returns
   */
  srvUpdateProducto(data: IProducto): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/productos/update/${data.codProducto}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }


  /**
   * ELIMINAR PRODUCTO
   * @param id
   * @return
   */
  srvDeleteProducto(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlApi}/service/productos/delete`,{ params: { 'producto': id } }).pipe(
      catchError((e:any)=> { return throwError(()=>e)})
    );
  }
}
