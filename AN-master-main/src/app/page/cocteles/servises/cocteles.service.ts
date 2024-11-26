import { Injectable } from '@angular/core';
import { cocteles } from '../interfaces/cocteles';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoctelesService {

   coctel:string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f='
  coctelSearch:string = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  coctelId:string = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='
  constructor(
    private http:HttpClient
  ) { }

  getcocteles():Observable<cocteles>{
    return this.http.get<cocteles>(`${this.coctel}a`)
  }

  getPaginacionCoctel(letra:string = 'a'):Observable<cocteles>{
    return this.http.get<cocteles>(`${this.coctel}${letra}`)
  }

  getcostelEncontrado(cocTermino:string):Observable<cocteles>{
    return this.http.get<cocteles>(`${this.coctelSearch}${cocTermino}`)
  }

  getcoctelId(cocId:number):Observable<cocteles>{
    return this.http.get<cocteles>(`${this.coctelId}${cocId}`)
  }
}
