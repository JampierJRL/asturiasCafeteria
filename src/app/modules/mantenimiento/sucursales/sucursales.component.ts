import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ISucursales } from 'src/app/data/interfaces/ISucursales';
import { SucursalesService } from 'src/app/data/services/sucursales.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.scss']
})
export class SucursalesComponent implements OnInit {
  srvUbigeo: any;
  dtListaDistritos: any;
  setProvincia: any;

  constructor(private fb: FormBuilder, private srvSucursales: SucursalesService) {}

  dtListaSucursales: ISucursales[] = []

  modeloSucursales: FormGroup = this.fb.group({
    codSucursal: [0],
    direccion: [''],
    nombreSucursal: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    telefono: [''],
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
    this.onListaSucursales();
  }

  onDistrito = () => {

    this.modeloSucursales.value.ubigeo =  {
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
        this.modeloSucursales.get('codProvincia').setValue(informacionDistrito.codProvincia);
        this.modeloSucursales.get('codDepartamento').setValue(informacionDistrito.codDepartamento);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onListaSucursales = (() => {
    this.srvSucursales.srvListaSucursales().subscribe({
      next: ((response: ISucursales[]) => {
        this.dtListaSucursales = response
        console.log(response);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarSucursales = (() => {
    if (this.modeloSucursales.get('codSucursal').value > 0) {
      this.srvSucursales.srvUpdateSucursal(this.modeloSucursales.value).subscribe({
        next: (({ message }) => {
          this.onListaSucursales()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloSucursales.reset({ estado: '' })
          this.frmUbigeo.reset({codDepartamento:0,codDistrito:0,codProvincia:0})
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvSucursales.srvCrearSucursal(this.modeloSucursales.value).subscribe({
        next: (({ message }) => {
          this.onListaSucursales()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloSucursales.reset({ estado: '' })
          this.frmUbigeo.reset({codDepartamento:0,codDistrito:0,codProvincia:0})
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarSucursales = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar el Sucursal?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvSucursales.srvDeleteSucursal(id).subscribe({
          next: (({ message }) => {
            this.onListaSucursales()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: ISucursales) => {
    console.log(data);

    this.modeloSucursales.reset(data)
    this.frmUbigeo.reset({
      codDepartamento:data.ubigeo.provincia.departamento.codDepartamento,
      codProvincia:data.ubigeo.provincia.codProvincia,
      codDistrito:data.ubigeo.codDistritos
    })
  })

}
