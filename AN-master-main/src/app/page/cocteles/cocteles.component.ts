import { CoctelesService } from './servises/cocteles.service';
import { Component } from '@angular/core';
import { cocteles } from './interfaces/cocteles';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { SearchComponent } from './search/search.component';

@Component({
  selector: 'app-cocteles',
  standalone: true,
  imports: [CardComponent, PaginacionComponent, SearchComponent],
  templateUrl: './cocteles.component.html',
  styleUrl: './cocteles.component.css'
})
export class CoctelesComponent {
  coctelAll: cocteles | undefined;

  constructor(private _srvCocteles: CoctelesService) { }

  ngOnInit(): void {
    this._srvCocteles.getPaginacionCoctel().subscribe(
      (cocteles) => {
        if (!cocteles) {
          console.log('no hay cocteles');
        } else {
          this.coctelAll = cocteles;
        }
      },
      (error) => {
        console.error('Error al obtener cocteles: ', error);
      }
    );
  }

  setNewCocteles(newCocteles: cocteles): void {
    this.coctelAll = newCocteles
  }

  searchCoctel(termin: string) {
    if (termin) {
      let numero = Number(termin)
      if(!isNaN(numero)){
        this._srvCocteles.getcoctelId(numero).subscribe(coctel =>{
          this.coctelAll = coctel
        })
      }else{
        this._srvCocteles.getcostelEncontrado(termin).subscribe(coctel => {
          this.coctelAll = coctel
        })
      }
      
    } else {
      this.ngOnInit()
    }
  }
}
