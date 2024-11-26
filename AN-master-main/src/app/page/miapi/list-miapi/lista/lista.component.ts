import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { allKdrama, Kdrama } from '../interface/kdrama';
import { KdramaService } from '../services/kdrama.service';
import { CommonModule, NgFor } from '@angular/common';
import { ModalCreacionComponent } from '../modal-creacion/modal-creacion.component';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [NgFor, CommonModule, ModalCreacionComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent{
  @Input() kdrama: allKdrama | undefined


  @ViewChild(ModalCreacionComponent) public modal!:ModalCreacionComponent
  constructor(private _srvKdrama:KdramaService){}

  editarDrama(drama: Kdrama): void {
    if(this.modal){
      this.modal.open(drama)
    }
  }



  eliminarDrama(id: string): void {
    this._srvKdrama.deleteKdrama(id).subscribe({
      next: next => {
        console.log('kdrma eliminado')
        if (this.kdrama) {
          this.kdrama.kdrama = this.kdrama.kdrama.filter(drama => drama._id !== id);
        }
      }
    })
    
  }

  verMas(drama: Kdrama): void {
    console.log('Sinopsis completa:', drama.sinopsis);
    
  }

}
