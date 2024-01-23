import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { ITipoDocumento } from "../interfaces/ITipoDocumento";

@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS TIPO DE DOCUMENTOS
   * @returns
   */
  srvListaTipoDocumentos(): Observable<ITipoDocumento[]> {

    return this.http.get<any[]>(`${this.urlApi}/service/tipodocumentos/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR TIPO DE DOCUMENTO
   * @param data
   * @returns
   */
  srvCrearTipoDocumento(data: ITipoDocumento): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/tipodocumentos/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR TIPO DE DOCUMENTO
   * @param data
   * @returns
   */
  srvUpdateTipoDocumento(data: ITipoDocumento): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/tipodocumentos/update/${data.codTipodocumento}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR TIPO DE DOCUMENTO
   * @param id
   * @returns
   */
  srvDeleteTipoDocumento(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/tipodocumentos/delete`, { params: { 'tipodocumento': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
