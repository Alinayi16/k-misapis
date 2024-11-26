import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, Pokemons } from '../interfaces/pokemons';



@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  [x: string]: any;

  private apiURLBase: string= 'https://pokeapi.co/api/v2/pokemon/';

  private next: string | null = null;
  private previus: string | null = null;

  constructor(
    private htpp: HttpClient
  ) { }

  getPokemons(url:string = this.apiURLBase ): Observable< Pokemons > {
    return this.htpp.get<Pokemons>(url);

  }
  getPokemon(termino: string | number ): Observable< Pokemon > {
    return this.htpp.get<Pokemon>(`${this.apiURLBase}/${termino}`);
  }

  set nextURL(url: string | null){
    this.next = url;
  }
  set prevURL(url: string | null){
    this.previus = url;
  }


  get nextURL(): string | null {
    return this.next; 
  }

  get prevURL(): string | null{
    return this.previus;
  }
}
