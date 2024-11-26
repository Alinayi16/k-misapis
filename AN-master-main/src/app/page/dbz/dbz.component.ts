import { Component, OnInit } from '@angular/core';
import { CardComponent } from './card/card.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { Affiliation, Dbzs, Gender } from './interfaces/dbzs';
import { DbzService } from './servises/dbz.service';
import { SearchComponent } from './search/search.component';


@Component({
  selector: 'app-dbz',
  standalone: true,
  imports: [
    CardComponent,
    PaginacionComponent,
    SearchComponent
  ],
  templateUrl: './dbz.component.html',
  styleUrl: './dbz.component.css'
})
export class DbzComponent implements OnInit {
  dbzs: Dbzs | undefined;

  constructor(
    private _srvDbz: DbzService
  ) { }

  ngOnInit(): void {
    this._srvDbz.getDbzs().subscribe((dbzAll) => {
      dbzAll.items.forEach((dbz) => {
        this._srvDbz.getDbz(dbz.id).subscribe((dbzData) => {
          dbz.Data = dbzData;
          this._srvDbz.nextURL = dbzAll.links.next;
          this._srvDbz.prevURL = dbzAll.links.previous;
        });
      });
      this.dbzs = dbzAll;
    });
  }

  setNewDbz(DbzsNew: Dbzs): void {
    this.dbzs = DbzsNew; 
    console.log(DbzsNew.links)
  }

  searchDbz(termino: number | string): void {
    if (termino) {
      this._srvDbz.getDbz(termino).subscribe((character) => {
        this.dbzs = {
          meta: {
            totalItems: 1,
            itemCount: 1,
            itemsPerPage: 1,
            totalPages: 1,
            currentPage: 1,
          },
          links: {
            first: '',
            previous: '',
            next: '',
            last: '',
          },
          items: [
            {
              id: character.id,
              name: character.name,
              ki: character.ki,
              maxKi: character.maxKi,
              race: character.race,
              gender: character.gender as Gender,
              description: character.description,
              image: character.image,
              affiliation: character.affiliation as Affiliation,
              deletedAt: character.deletedAt,
              Data: character
            }
          ]
        };
        this._srvDbz.nextURL=null;
        this._srvDbz.prevURL=null;
      });
    } else {
      this.ngOnInit();
    }
  }
  


}
