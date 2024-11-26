import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Pokemon } from '../interfaces/pokemons';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() pokemon:Pokemon = {
    name:'',
    height:0,
    weight: 0,
    sprites:{
      front_default:''
    }
  }as Pokemon

  private bootstrapModal: any;

  @ViewChild('modalElement') public elemnto!:ElementRef
  constructor(
    @Inject(PLATFORM_ID) private plataformID:object
  ){}

  

  ngAfterViewInit():void{
    if(isPlatformBrowser(this.plataformID)){
      this.inicializeModal()
    }
  }

  inicializeModal():void{
    import('bootstrap').then(bootstrap =>{
      this.bootstrapModal = new bootstrap.Modal(this.elemnto.nativeElement)
    })
  }

  open(pokemon:Pokemon):void{
    this.pokemon = pokemon
    if(isPlatformBrowser(this.plataformID)){
      if(this.bootstrapModal){
        this.bootstrapModal.show();
      }else{
        this.inicializeModal()
        setTimeout(()=>{
          this.bootstrapModal.show();
        }, 0)
      }
    }
  }
}
