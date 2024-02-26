import { Input, Output, EventEmitter } from '@angular/core';
import { PerfilesService } from 'src/app/data/services/perfiles.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cbo-perfiles-user',
  templateUrl: './cbo-perfiles-user.component.html',
  styles: [
  ]
})
export class CboPerfilesUserComponent implements OnInit {

  @Input() setPerfiles;

  //permite enviar datos seleccionados del hijo al padre
  @Output() getPerfiles: EventEmitter<any> = new EventEmitter();

  constructor(private srvPerfiles: PerfilesService) { }

  dtPerfiles: any[]=[]


  ngOnInit(): void {
    this.onListaPerfiles()
  }

  onListaPerfiles = (() => {
    this.srvPerfiles.srvListaPerfiles().subscribe({
      next: ((response: any[]) => {
        this.dtPerfiles = response
      }),
      error: ((err) => {
        console.log(err);
      })
    })
  })

  onEmitter = (()=>{
  this.getPerfiles.emit(this.setPerfiles)
  })
}
