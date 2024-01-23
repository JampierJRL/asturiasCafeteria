import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UbigeosService } from 'src/app/data/services/ubigeos.service';

@Component({
  selector: 'app-cbo-departamento',
  templateUrl: './cbo-departamento.component.html',
  styles: [
  ]
})
export class CboDepartamentoComponent implements OnInit, OnChanges {

  @Input() setValor: any;

  //permite enviar datos seleccionados del hijo al padre
  @Output() outValor: EventEmitter<any> = new EventEmitter();

  constructor(private srvUbigeo:UbigeosService) { }

  dtListaDepartamentos:any[] = [];

  ngOnInit(): void {
    this.onListaDepartamentos()
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(this.setValor== 0){
        this.dtListaDepartamentos=[];
        this.onListaDepartamentos()
      }
  }


  onListaDepartamentos = (() => {
    this.srvUbigeo.srvListaDepartamentos().subscribe({
      next:((response) => {
        this.dtListaDepartamentos = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onEmitter = (() => {
    this.outValor.emit(this.setValor)
  })
}
