import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() eventEmitTermino = new EventEmitter<string>();

  getTermin(termino:string){
    this.eventEmitTermino.emit(termino)
  }
}
