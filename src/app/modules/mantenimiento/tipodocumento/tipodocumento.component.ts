import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITipoDocumento } from 'src/app/data/interfaces/ITipoDocumento';
import { TipoDocumentoService } from 'src/app/data/services/tipodocumento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipodocumento',
  templateUrl: './tipodocumento.component.html',
  styleUrls: ['./tipodocumento.component.scss']
})

export class TipoDocumentoComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvTipoDocumento: TipoDocumentoService) { }

  dtListaTipoDocumento: ITipoDocumento[] = []

  modeloTipoDocumento: FormGroup = this.fb.group({
    codTipodocumento: [0],
    descripcionDocumento: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.onListaTipoDocumento();
  }

  onListaTipoDocumento = (() => {
    this.srvTipoDocumento.srvListaTipoDocumentos().subscribe({
      next: ((response: ITipoDocumento[]) => {
        this.dtListaTipoDocumento = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarTipoDocumento = (() => {
    if (this.modeloTipoDocumento.get('codTipodocumento').value > 0) {
      this.srvTipoDocumento.srvUpdateTipoDocumento(this.modeloTipoDocumento.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoDocumento()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoDocumento.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvTipoDocumento.srvCrearTipoDocumento(this.modeloTipoDocumento.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoDocumento()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoDocumento.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarTipoDocumento = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este tipo de documento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvTipoDocumento.srvDeleteTipoDocumento(id).subscribe({
          next: (({ message }) => {
            this.onListaTipoDocumento()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: ITipoDocumento) => {
    this.modeloTipoDocumento.setValue(data)
  })

}
