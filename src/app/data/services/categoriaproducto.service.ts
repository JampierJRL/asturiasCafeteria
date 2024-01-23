import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http"
import { Observable, catchError, throwError } from 'rxjs';
import { ICategoriaProducto } from '../interfaces/ICategoriaProducto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaproductoService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LAS CATEGORIAS
   * @returns
   */
  srvListaCategorias(): Observable<ICategoriaProducto[]> {

    return this.http.get<ICategoriaProducto[]>(`${this.urlApi}/api/v1/categoria/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR CATEGORIA
   * @param data
   * @returns
   */
  srvCrearCategoria(data: ICategoriaProducto): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/api/v1/categoria/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR CATEGORIA
   * @param data
   * @returns
   */
  srvUpdateCategoria(data: ICategoriaProducto): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/api/v1/categoria/update/${data.codCategoria}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR CATEGORIA
   * @param id
   * @returns
   */
  srvDeleteCategoria(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/api/v1/categoria/delete`, { params: { 'categoria': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
