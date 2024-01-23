import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITipoConsumo } from 'src/app/data/interfaces/ITipoConsumo';
import { TipoConsumoService } from 'src/app/data/services/tipoconsumo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoConsumo',
  templateUrl: './tipoconsumo.component.html',
  styleUrls: ['./tipoconsumo.component.scss']
})
export class TipoConsumoComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvTipoConsumo: TipoConsumoService) { }

  dtListaTipoConsumo: ITipoConsumo[] = []

  modeloTipoConsumo: FormGroup = this.fb.group({
    codTipoconsumo: [0],
    descripcionConsumo: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.onListaTipoConsumo();
  }

  onListaTipoConsumo = (() => {
    this.srvTipoConsumo.srvListaTipoConsumo().subscribe({
      next: ((response: ITipoConsumo[]) => {
        this.dtListaTipoConsumo = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarTipoConsumo = (() => {
    if (this.modeloTipoConsumo.get('codTipoconsumo').value > 0) {
      this.srvTipoConsumo.srvUpdateTipoConsumo(this.modeloTipoConsumo.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoConsumo()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoConsumo.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvTipoConsumo.srvCrearTipoConsumo(this.modeloTipoConsumo.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoConsumo()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoConsumo.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarTipoConsumo = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta tipo de consumo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvTipoConsumo.srvDeleteTipoConsumo(id).subscribe({
          next: (({ message }) => {
            this.onListaTipoConsumo()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: ITipoConsumo) => {
    this.modeloTipoConsumo.setValue(data)
  })

}
