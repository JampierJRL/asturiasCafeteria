import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IPerfiles } from "../interfaces/IPerfiles";

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS PERFILES
   * @returns
   */
  srvListaPerfiles(): Observable<IPerfiles[]> {

    return this.http.get<IPerfiles[]>(`${this.urlApi}/service/perfiles/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR PERFIL
   * @param data
   * @returns
   */
  srvCrearPerfil(data: IPerfiles): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/perfiles/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR PERFIL
   * @param data
   * @returns
   */
  srvUpdatePerfil(data: IPerfiles): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/perfiles/update/${data.codPerfil}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR PERFIL
   * @param id
   * @returns
   */
  srvDeletePerfil(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/perfiles/delete`, { params: { 'perfiles': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
