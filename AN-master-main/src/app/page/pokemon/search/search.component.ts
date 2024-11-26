import { Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'poke-busqueda',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() public eventSearch = new EventEmitter<string>();

  searchPokemon(termino:string | number): void {
    const termSearch = termino.toString().trim();
    //if(termSearch.length === 0){
    //  return;
    //}

    this.eventSearch.emit(termSearch);

  }
}
