import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dbz-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() public eventSearch = new EventEmitter<string>();

  searchDbz(termino:number | string): void {
    const termSearch = termino.toString().trim();
    //if(termSearch.length === 0){
    //  return;
    //}

    this.eventSearch.emit(termSearch);

  }


}
