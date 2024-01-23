import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoriaProducto } from 'src/app/data/interfaces/ICategoriaProducto';
import { CategoriaproductoService } from 'src/app/data/services/categoriaproducto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoriaproducto',
  templateUrl: './categoriaproducto.component.html',
  styleUrls: ['./categoriaproducto.component.scss']
})
export class CategoriaproductoComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvCategoria: CategoriaproductoService) { }

  dtListaCategoriasProducto: ICategoriaProducto[] = []

  modelo: FormGroup = this.fb.group({
    codCategoria: [0],
    descripcionCategoria: ['', [Validators.required]],
    estado: ['', [Validators.required]]
  })

  ngOnInit(): void {
    this.onListaCategorias();
  }

  onListaCategorias = (() => {
    this.srvCategoria.srvListaCategorias().subscribe({
      next: ((response: ICategoriaProducto[]) => {
        this.dtListaCategoriasProducto = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarCategoriaProducto = (() => {
    if (this.modelo.get('codCategoria').value > 0) {
      this.srvCategoria.srvUpdateCategoria(this.modelo.value).subscribe({
        next: (({ message }) => {
          this.onListaCategorias()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modelo.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvCategoria.srvCrearCategoria(this.modelo.value).subscribe({
        next: (({ message }) => {
          this.onListaCategorias()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modelo.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarCategoriaProducto = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta categoria?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvCategoria.srvDeleteCategoria(id).subscribe({
          next: (({ message }) => {
            this.onListaCategorias()
            Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: ICategoriaProducto) => {
    this.modelo.setValue(data)
  })

}
