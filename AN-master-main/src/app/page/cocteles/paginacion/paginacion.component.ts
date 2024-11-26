import { Component, EventEmitter, Output } from '@angular/core';
import { cocteles } from '../interfaces/cocteles';
import { CoctelesService } from '../servises/cocteles.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  standalone: true,
  imports: [NgClass, NgFor, NgIf],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {
   @Output() public eventNewCocteles = new EventEmitter<cocteles>();
  abecedario = ['a',  'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

  constructor(
    private _srvCocteles:CoctelesService
  ){}

  letraClickeada:string = ''

  cogerLetra(letra:string){
    this.letraClickeada = letra
    console.log(letra)
  }

  siguientePagina(letraSiguiente:string){
    this._srvCocteles.getPaginacionCoctel(letraSiguiente).subscribe(coctel =>{
      this.eventNewCocteles.emit(coctel)
    })
  }
}
