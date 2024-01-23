export interface IDatosPersonales {
  numeroDocumento: string;
  primerNombre:    string;
  sexoDescripcion: string;
  fechaNacimiento: Date;
  direccion:       string;
  telefono:        string;
  ruc:             string;
  email:           string;
  fechaIngreso:    Date;
  fechaEgreso:     Date;
  segundoNombre:   string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  razonSocial:     string;
  celular:         string;
  estadoPersona:   boolean;
  tipoDocumento:   TipoDocumento;
  ubigeo:          Ubigeo;
}

export interface TipoDocumento {
  codTipodocumento:     number;
  descripcionDocumento: string;
}

export interface Ubigeo {
  codDistritos:   number;
  nombreDistrito: string;
  provincia:      Provincia;
}

export interface Provincia {
  codProvincia:    number;
  nombreProvincia: string;
  departamento:    Departamento;
}

export interface Departamento {
  codDepartamento:    number;
  nombreDepartamento: string;
}

