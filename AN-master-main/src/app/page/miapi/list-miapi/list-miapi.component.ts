import { Component, ViewChild } from '@angular/core';
import { allKdrama } from './interface/kdrama';
import { KdramaService } from './services/kdrama.service';
import { ListaComponent } from './lista/lista.component';
import { ModalEdicionComponent } from './lista/modal-edicion/modal-edicion.component';

@Component({
  selector: 'app-list-miapi',
  standalone: true,
  imports: [ListaComponent, ModalEdicionComponent],
  templateUrl: './list-miapi.component.html',
  styleUrl: './list-miapi.component.css'
})
export class ListMiapiComponent {
  kdramas:allKdrama | undefined

  @ViewChild(ModalEdicionComponent) public modal!:ModalEdicionComponent
  constructor(private _srvKdrama:KdramaService){}

  ngOnInit(): void {
    this._srvKdrama.getAllKdram().subscribe(k => {
      this.kdramas = k
    })
  }

  openmodal(){
    if(this.modal){
      this.modal.open()
    }
  }
}
