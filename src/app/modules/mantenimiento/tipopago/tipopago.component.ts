import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITipoPago } from 'src/app/data/interfaces/ITipoPago';
import { TipoPagoService } from 'src/app/data/services/tipopago.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipoPago',
  templateUrl: './tipopago.component.html',
  styleUrls: ['./tipopago.component.scss']
})

export class TipoPagoComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvTipoPago: TipoPagoService) { }

  dtListaTipoPago: ITipoPago[] = []

  modeloTipoPago: FormGroup = this.fb.group({
    codTipoPago: [0],
    descripcion: ['', [Validators.required]],
    estado: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.onListaTipoPago();
  }

  onListaTipoPago = (() => {
    this.srvTipoPago.srvListaTipoPago().subscribe({
      next: ((response: ITipoPago[]) => {
        this.dtListaTipoPago = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarTipoPago = (() => {
    if (this.modeloTipoPago.get('codTipoPago').value > 0) {
      this.srvTipoPago.srvUpdateTipoPago(this.modeloTipoPago.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoPago()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoPago.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvTipoPago.srvCrearTipoPago(this.modeloTipoPago.value).subscribe({
        next: (({ message }) => {
          this.onListaTipoPago()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloTipoPago.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarTipoPago = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar este tipo de pago?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvTipoPago.srvDeleteTipoPago(id).subscribe({
          next: (({ message }) => {
            this.onListaTipoPago()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: ITipoPago) => {
    this.modeloTipoPago.setValue(data)
  })

}
