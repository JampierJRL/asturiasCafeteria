import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UbigeosService } from 'src/app/data/services/ubigeos.service';

@Component({
  selector: 'app-cbo-provincias',
  templateUrl: './cbo-provincias.component.html',
  styles: [
  ]
})
export class CboProvinciasComponent implements OnInit, OnChanges {

  @Input() setValor;
  @Input() setDepartamento;

  //permite enviar datos seleccionados del hijo al padre
  @Output() outValor: EventEmitter<any> = new EventEmitter();

  constructor(private srvUbigeo: UbigeosService) { }

  dtListaProvincias: any[] = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes.setDepartamento);
    console.log(this.setDepartamento);

    if (this.setDepartamento > 0 && this.setValor == 0) {
      this.onListaProvincias()
    }

    if (changes.setDepartamento !== undefined) {
      if (changes.setDepartamento.currentValue !== changes.setDepartamento.previousValue) {
        this.onListaProvincias()
      }
    }

  }

  onListaProvincias = (() => {
    this.srvUbigeo.srvListaProvincias(this.setDepartamento).subscribe({
      next: ((response) => {
        console.log(response);

        this.dtListaProvincias = response
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
