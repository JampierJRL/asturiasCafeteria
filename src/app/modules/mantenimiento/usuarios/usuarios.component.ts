import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsuarios } from 'src/app/data/interfaces/IUsuarios';
import { UsuariosService } from 'src/app/data/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvUsuarios: UsuariosService) { }

  dtListaUsuarios: IUsuarios[]=[]

  modeloUsuarios: FormGroup = this.fb.group({
    codUsuario: [0],
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
    estadoClave: [''],
    estadoCuenta: [''],
    fechaCambioClave: [''],
    perfiles: this.fb.group({
      codPerfil: ['', [Validators.required]],
    }),
    datosPersonales: this.fb.group({
      codPersona: ['', [Validators.required]],
    }),
    sucursales: this.fb.group({
      codSucursal: ['', [Validators.required]],
    })
  })


  ngOnInit(): void {
    this.onListaUsuarios();
  }

  onListaUsuarios = (() => {
    this.srvUsuarios.srvListaUsuario().subscribe({
      next: ((response: IUsuarios[]) => {
        this.dtListaUsuarios = response
        console.log(response);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarUsuarios = (() => {
    if (this.modeloUsuarios.get('codUsuario').value > 0) {
      this.srvUsuarios.srvUpdateUsuario(this.modeloUsuarios.value).subscribe({
        next: (({ message }) => {
          this.onListaUsuarios()
          Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          this.modeloUsuarios.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvUsuarios.srvCrearUsuario(this.modeloUsuarios.value).subscribe({
        next: (({ message }) => {
          this.onListaUsuarios()
          Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          this.modeloUsuarios.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarUsuarios = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este Usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvUsuarios.srvDeleteUsuario(id).subscribe({
          next: (({ message }) => {
            this.onListaUsuarios()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: IUsuarios) => {
    this.modeloUsuarios.setValue(data)
  })

}
