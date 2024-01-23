import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMesas } from 'src/app/data/interfaces/IMesas';
import { MesasService } from 'src/app/data/services/mesas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mesa',
  templateUrl: './mesas.component.html',
  styleUrls: ['./mesas.component.scss']
})
export class MesasComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvMesas: MesasService) { }

  dtListaMesas: IMesas[] = []

  modeloMesa: FormGroup = this.fb.group({
    codMesa: [0],
    descripcion: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    numeroMesa: ['', [Validators.required]],
  })

  ngOnInit(): void {
    this.onListaMesas();
  }

  onListaMesas = (() => {
    this.srvMesas.srvListaMesas().subscribe({
      next: ((response: IMesas[]) => {
        this.dtListaMesas = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarMesas = (() => {
    if (this.modeloMesa.get('codMesa').value > 0) {
      this.srvMesas.srvUpdateMesas(this.modeloMesa.value).subscribe({
        next: (({ message }) => {
          this.onListaMesas()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloMesa.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvMesas.srvCrearMesas(this.modeloMesa.value).subscribe({
        next: (({ message }) => {
          this.onListaMesas()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloMesa.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarMesas = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta mesa?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvMesas.srvDeleteMesas(id).subscribe({
          next: (({ message }) => {
            this.onListaMesas()
            Swal.fire({ icon: 'success', title: 'Muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: IMesas) => {
    this.modeloMesa.setValue(data)
  })

}
