import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoDocumentoService } from 'src/app/data/services/tipodocumento.service';

@Component({
  selector: 'app-cbo-tipo-documento',
  templateUrl: './cbo-tipo-documento.component.html',
  styles: [
  ]
})
export class CboTipoDocumentoComponent implements OnInit {

@Input() setTipoDocumento;

@Output() getTipoDocumento: EventEmitter<any> = new EventEmitter

  constructor(private srvTipoDocumento: TipoDocumentoService) { }

  dtTipoDocumento: any[]=[]

  ngOnInit(): void {
    this.onListaTipoDocumento()
  }

  onListaTipoDocumento = (() => {
    this.srvTipoDocumento.srvListaTipoDocumentos().subscribe({
      next:((response: any[]) => {
        this.dtTipoDocumento = response
      }),
      error: ((err) =>{
        console.log(err);
      })
    })
  })

  onEmitter =(()=>{
    this.getTipoDocumento.emit(this.setTipoDocumento)
  })

}
