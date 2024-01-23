import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UbigeosService } from 'src/app/data/services/ubigeos.service';

@Component({
  selector: 'app-cbo-distritos',
  templateUrl: './cbo-distritos.component.html',
  styles: [
  ]
})
export class CboDistritosComponent implements OnInit, OnChanges {

  @Input() setValor = 0;
  @Input() setProvincia;

  //permite enviar datos seleccionados del hijo al padre
  @Output() outValor: EventEmitter<any> = new EventEmitter();

  constructor(private srvUbigeo:UbigeosService) { }

  dtListaDistritos:any[] = [];

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.setProvincia > 0 ){
      this.onListaDistritos()
    }
  }

  onListaDistritos = (() => {
    this.srvUbigeo.srvListaDistritos(this.setProvincia).subscribe({
      next:((response) => {
        this.dtListaDistritos = response
        console.log(response);
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
