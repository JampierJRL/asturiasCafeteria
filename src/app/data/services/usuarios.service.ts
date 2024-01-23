import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { IUsuarios } from "../interfaces/IUsuarios";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }

  /**
   * LISTA LOS USUARIOS
   * @returns
   */
  srvListaUsuario(): Observable<IUsuarios[]> {

    return this.http.get<IUsuarios[]>(`${this.urlApi}/service/usuarios/list`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * CREAR USUARIO
   * @param data
   * @returns
   */
  srvCrearUsuario(data: IUsuarios): Observable<any> {

    return this.http.post<any>(`${this.urlApi}/service/usuarios/create`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ACTUALIZAR USUARIO
   * @param data
   * @returns
   */
  srvUpdateUsuario(data: IUsuarios): Observable<any> {

    return this.http.put<any>(`${this.urlApi}/service/usuarios/update/${data.codUsuario}`, data).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  /**
   * ELIMINAR USUARIO
   * @param id
   * @returns
   */
  srvDeleteUsuario(id: number): Observable<any> {

    return this.http.delete<any>(`${this.urlApi}/service/usuarios/delete`, { params: { 'usuario': id } }).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }
}
