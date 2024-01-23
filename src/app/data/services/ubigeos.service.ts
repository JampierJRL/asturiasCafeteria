import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UbigeosService {


  urlApi = environment.apiPath;

  constructor(private http: HttpClient) { }


  srvListaDepartamentos(): Observable<any[]> {

    return this.http.get<any[]>(`${this.urlApi}/api/v1/ubigeo/list/departamentos`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  srvListaProvincias(idDepartamento:number): Observable<any[]> {

    return this.http.get<any[]>(`${this.urlApi}/api/v1/ubigeo/list/provincias/${idDepartamento}`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }


  srvListaDistritos(idProvincia:number): Observable<any[]> {

    return this.http.get<any[]>(`${this.urlApi}/api/v1/ubigeo/list/distritos/${idProvincia}`).pipe(
      catchError((e: any) => { return throwError(() => e) })
    );
  }

  obtenerInformacionUbigeoPorDistrito(codDistrito: string): Observable<any> {
    // Lógica para hacer la solicitud HTTP o acceder a una fuente de datos
    // Devolver un observable con la información del distrito, incluyendo codProvincia y codDepartamento
    return this.http.get<any>(`/api/v1/ubigeo/list/distritos/${codDistrito}`);
  }


}
