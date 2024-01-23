import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDatosPersonales } from 'src/app/data/interfaces/IDatosPersonales';
import { DatosPersonalesService } from 'src/app/data/services/datospersonales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datospersonales',
  templateUrl: './datospersonales.component.html',
  styleUrls: ['./datospersonales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {
  srvUbigeo: any;
  dtListaDistritos: any;
  setProvincia: any;

  constructor(private fb: FormBuilder, private srvDatosPersonales: DatosPersonalesService) { }

  dtListaDatosPersonales: IDatosPersonales[] = []

  modeloDatosPersonales: FormGroup = this.fb.group({
    codPersona: [0],
    apellidoMaterno: ['', [Validators.required]],
    apellidoPaterno: ['', [Validators.required]],
    celular: [''],
    direccion: [''],
    email: ['', [Validators.required]],
    estadoPersona: ['', [Validators.required]],
    fechaEgreso: ['', [Validators.required]],
    fechaIngreso: ['', [Validators.required]],
    fechaNacimiento: ['', [Validators.required]],
    numeroDocumento: ['', [Validators.required]],
    primerNombre: ['', [Validators.required]],
    razonSocial: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    segundoNombre: ['', [Validators.required]],
    telefono: ['', [Validators.required]],
    tipoDocumento: this.fb.group({
      codTipodocumento: ['', [Validators.required]],
    }),
    sexoDescripcion: [""],
    ubigeo: this.fb.group({
      codDistritos: ["", [Validators.required]],
      nombreDistrito: [""],
      provincia: this.fb.group({
        codProvincia: ["", [Validators.required]],
        nombreProvincia: [""],
        departamento: this.fb.group({
          codDepartamento: ["", [Validators.required]],
          nombreDepartamento: [""]
        })
      })
    })
  })

  frmUbigeo = this.fb.group({
    codDepartamento: [0],
    codProvincia: [0],
    codDistrito: [0],
  })

  ngOnInit(): void {
    this.onListaDatosPersonales();
  }

  onDistrito = () => {

    this.modeloDatosPersonales.value.ubigeo =  {
      codDistritos: this.frmUbigeo.value.codDistrito,
      nombreDistrito: "",
      provincia: {
        codProvincia: this.frmUbigeo.value.codProvincia,
        nombreProvincia: "",
        departamento: {
          codDepartamento: this.frmUbigeo.value.codDepartamento,
          nombreDepartamento: ""
        }
      }
    }
  }

  onListaDistritos() {
    this.srvUbigeo.srvListaDistritos(this.setProvincia).subscribe({
      next: (response) => {
        this.dtListaDistritos = response;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onDistritoChange(codDistrito: string) {
    this.srvUbigeo.obtenerInformacionUbigeoPorDistrito(codDistrito).subscribe({
      next: (informacionDistrito) => {
        this.modeloDatosPersonales.get('codProvincia').setValue(informacionDistrito.codProvincia);
        this.modeloDatosPersonales.get('codDepartamento').setValue(informacionDistrito.codDepartamento);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onListaDatosPersonales = (() => {
    this.srvDatosPersonales.srvListaDatosPersonales().subscribe({
      next: ((response: IDatosPersonales[]) => {
        this.dtListaDatosPersonales = response
        console.log(response);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarDatosPersonales = (() => {
    if (this.modeloDatosPersonales.get('codPersona').value > 0) {
      this.srvDatosPersonales.srvUpdateDatosPersonales(this.modeloDatosPersonales.value).subscribe({
        next: (({ message }) => {
          this.onListaDatosPersonales()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloDatosPersonales.reset({ estado: '' })
          this.frmUbigeo.reset({codDepartamento:0,codDistrito:0,codProvincia:0})
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvDatosPersonales.srvCrearDatosPersonales(this.modeloDatosPersonales.value).subscribe({
        next: (({ message }) => {
          this.onListaDatosPersonales()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloDatosPersonales.reset({ estado: '' })
          this.frmUbigeo.reset({codDepartamento:0,codDistrito:0,codProvincia:0})
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarDatosPersonales = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Dato Personal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvDatosPersonales.srvDeleteDatosPersonales(id).subscribe({
          next: (({ message }) => {
            this.onListaDatosPersonales()
            Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: IDatosPersonales) => {
    console.log(data);

    this.modeloDatosPersonales.reset(data)
    this.frmUbigeo.reset({
      codDepartamento:data.ubigeo.provincia.departamento.codDepartamento,
      codProvincia:data.ubigeo.provincia.codProvincia,
      codDistrito:data.ubigeo.codDistritos
    })
  })

}
