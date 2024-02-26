import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { SucursalesService } from 'src/app/data/services/sucursales.service';


@Component({
  selector: 'app-cbo-sucursales-user',
  templateUrl: './cbo-sucursales-user.component.html',
  styles: [
  ]
})
export class CboSucursalesUserComponent implements OnInit {

  @Input() setSucursales;

  //permite enviar datos seleccionados del hijo al padre
  @Output() getSucursales: EventEmitter<any> = new EventEmitter();

  constructor(private srvSucursal: SucursalesService) { }

  dtSucursales: any[]=[]


  ngOnInit(): void {
    this.onListaSucursales()
  }

  onListaSucursales = (() => {
    this.srvSucursal.srvListaSucursales().subscribe({
      next: ((response: any[]) => {
        this.dtSucursales = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onEmitter = (()=>{
  this.getSucursales.emit(this.setSucursales)
  })
}
