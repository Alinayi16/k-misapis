import { Component, EventEmitter, Output } from '@angular/core';
import { PokemonService } from '../servises/pokemon.service';
import { NgClass } from '@angular/common';

import { Pokemons } from '../interfaces/pokemons';


@Component({
  selector: 'pokemon-pagi',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './paginacion.component.html',
  styleUrl: './paginacion.component.css'
})
export class PaginacionComponent {

  @Output() public eventNewPokemons = new EventEmitter<Pokemons>();

  constructor(
    private _srvPokemon: PokemonService
  ) { }

  get nextURL(): string | null {
    return this._srvPokemon.nextURL;
  }
  get prevURL(): string | null {
    return this._srvPokemon.prevURL;
  }

  loadPokemons(url: string) {
    this._srvPokemon.getPokemons(url).subscribe((pokemonsAll) => {
      pokemonsAll.results.forEach((pokemon) => {
        this._srvPokemon.getPokemon(pokemon.name).subscribe((pokemonData) => {
          pokemon.data = pokemonData;
          this._srvPokemon.nextURL = pokemonsAll.next;
          this._srvPokemon.prevURL = pokemonsAll.previous;
          this.eventNewPokemons.emit(pokemonsAll);
        });
      });
    });
  }
}

