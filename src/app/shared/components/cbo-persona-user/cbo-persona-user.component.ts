import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { DatosPersonalesService } from 'src/app/data/services/datospersonales.service';


@Component({
  selector: 'app-cbo-persona-user',
  templateUrl: './cbo-persona-user.component.html',
  styles: [
  ]
})
export class CboPersonaUserComponent implements OnInit {

  @Input() setPersona;

  //permite enviar datos seleccionados del hijo al padre
  @Output() getPersona: EventEmitter<any> = new EventEmitter();

  constructor(private srvDatosPersonales: DatosPersonalesService) { }

  dtDatosPersonales: any[]=[]


  ngOnInit(): void {
    this.onListaDatosPersonales()
  }

  onListaDatosPersonales = (() => {
    this.srvDatosPersonales.srvListaDatosPersonales().subscribe({
      next: ((response: any[]) => {
        this.dtDatosPersonales = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onEmitter = (()=>{
  this.getPersona.emit(this.setPersona)
  })
}
