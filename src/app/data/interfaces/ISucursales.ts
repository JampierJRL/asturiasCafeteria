
export interface ISucursales {
  codSucursal?:         number;
  direccion?:           string;
  nombreSucursal?:      string;
  ruc?:                 string;
  telefono?:            string;
  ubigeo?:              Ubigeo;
}

export interface Ubigeo {
  codDistritos?:   number;
  nombreDistrito?: string;
  provincia?:      Provincia;
}

export interface Provincia {
  codProvincia?:    number;
  nombreProvincia?: string;
  departamento?:    Departamento;
}

export interface Departamento {
  codDepartamento?:    number;
  nombreDepartamento?: string;
}
