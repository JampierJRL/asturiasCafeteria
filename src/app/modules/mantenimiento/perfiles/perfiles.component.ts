import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPerfiles } from 'src/app/data/interfaces/IPerfiles';
import { PerfilesService } from 'src/app/data/services/perfiles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss']
})

export class PerfilesComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvPerfiles: PerfilesService) { }

  dtListaPerfiles: IPerfiles[] = []

  modeloPerfiles: FormGroup = this.fb.group({
    codPerfil: [0],
    descripcionPerfil: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.onListaPerfiles();
  }

  onListaPerfiles = (() => {
    this.srvPerfiles.srvListaPerfiles().subscribe({
      next: ((response: IPerfiles[]) => {
        this.dtListaPerfiles = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarPerfil = (() => {
    if (this.modeloPerfiles.get('codPerfil').value > 0) {
      this.srvPerfiles.srvUpdatePerfil(this.modeloPerfiles.value).subscribe({
        next: (({ message }) => {
          this.onListaPerfiles()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloPerfiles.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvPerfiles.srvCrearPerfil(this.modeloPerfiles.value).subscribe({
        next: (({ message }) => {
          this.onListaPerfiles()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloPerfiles.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarPerfil = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este perfil?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvPerfiles.srvDeletePerfil(id).subscribe({
          next: (({ message }) => {
            this.onListaPerfiles()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: IPerfiles) => {
    this.modeloPerfiles.setValue(data)
  })

}
