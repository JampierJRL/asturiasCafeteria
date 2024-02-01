import { Ubigeo } from "./IDatosPersonales";


export interface ISucursales {
  codSucursal?:         number;
  direccion?:           string;
  nombreSucursal?:      string;
  ruc?:                 string;
  telefono?:            string;
  ubigeo:               Ubigeo;
}
