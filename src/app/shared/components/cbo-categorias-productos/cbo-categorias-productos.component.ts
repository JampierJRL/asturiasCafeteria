import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriaproductoService } from 'src/app/data/services/categoriaproducto.service';


@Component({
  selector: 'app-cbo-categorias-productos',
  templateUrl: './cbo-categorias-productos.component.html',
  styles: [
  ]
})
export class CboCategoriasProductosComponent implements OnInit {

  @Input() setCategoria;

  //permite enviar datos seleccionados del hijo al padre
  @Output() getCategoria: EventEmitter<any> = new EventEmitter();

  constructor(private srvCatergoria: CategoriaproductoService) { }

  dtCategorias: any[]=[]


  ngOnInit(): void {
    this.onListaCategorias()
  }

  onListaCategorias = (() => {
    this.srvCatergoria.srvListaCategorias().subscribe({
      next: ((response: any[]) => {
        this.dtCategorias = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onEmitter = (()=>{
  this.getCategoria.emit(this.setCategoria)
  })
}
