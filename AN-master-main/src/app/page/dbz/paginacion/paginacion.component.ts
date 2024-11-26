import { NgClass } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { DbzService } from '../servises/dbz.service';
import { Dbzs } from '../interfaces/dbzs';

@Component({
  selector: 'Dbz-pagi',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewDbzs = new EventEmitter<Dbzs>();

  constructor(
    private _srvDbz: DbzService
  ) { }

  get nextURL(): string | null {
    return this._srvDbz.nextURL;
  }

  get prevURL(): string | null {
    return this._srvDbz.prevURL;
  }

  loadDbzs(url: string): void {
    console.log(url)
    this._srvDbz.getDbzs(url).subscribe((dbzsAll) => {
      console.log(dbzsAll)
      dbzsAll.items.forEach((character) => {
        this._srvDbz.getDbz(character.id).subscribe((characterData) => {
          character.Data = characterData;
          this._srvDbz.nextURL = dbzsAll.links.next;
          this._srvDbz.prevURL = dbzsAll.links.previous;
          console.log(dbzsAll.items)
          this.eventNewDbzs.emit(dbzsAll);
        });
      });
    });
  }
}