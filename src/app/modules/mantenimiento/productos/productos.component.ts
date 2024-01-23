import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProducto } from 'src/app/data/interfaces/IProducto';
import { ProductosService } from 'src/app/data/services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  constructor(private fb: FormBuilder, private srvProductos: ProductosService) { }

  dtListaProductos: IProducto[] = []

  modeloProducto: FormGroup = this.fb.group({
    codProducto: [0],
    descripcionProducto: ['', [Validators.required]],
    estado: ['', [Validators.required]],
    observacion: ['', [Validators.required]],
    precioCompra: ['', [Validators.required]],
    precioVenta: ['', [Validators.required]],
    stockAlmacen: ['', [Validators.required]],
    stockCompra: ['', [Validators.required]],
    categoria: this.fb.group({
      codCategoria: ['', [Validators.required]],
    })
  })

  frmDatosPersonales = this.fb.group({
    codDepartamento:[""],
    codProvincia:[""],
    codDistrito:[""],
  })

  ngOnInit(): void {
    this.onListaProductos();
  }

  onListaProductos = (() => {
    this.srvProductos.srvListaProducto().subscribe({
      next: ((response: IProducto[]) => {
        this.dtListaProductos = response
        console.log(response);
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onprocesarProductos = (() => {
    if (this.modeloProducto.get('codProducto').value > 0) {
      this.srvProductos.srvUpdateProducto(this.modeloProducto.value).subscribe({
        next: (({ message }) => {
          this.onListaProductos()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloProducto.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    } else {
      this.srvProductos.srvCrearProducto(this.modeloProducto.value).subscribe({
        next: (({ message }) => {
          this.onListaProductos()
          Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          this.modeloProducto.reset({ estado: '' })
        }),
        error: ((err) => {
          console.log(err);
        })
      })
    }

  })

  onEliminarProducto = ((id: number) => {
    Swal.fire({
      title: '¿Estas seguro de eliminar esta Producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvProductos.srvDeleteProducto(id).subscribe({
          next: (({ message }) => {
            this.onListaProductos()
            Swal.fire({ icon: 'success', title: 'muy Bien!', html: message })
          }),
          error: ((err) => {
            console.log(err);
          })
        })
      }
    })

  })

  onPreviewModel = ((data: IProducto) => {
    this.modeloProducto.setValue(data)
  })

}
