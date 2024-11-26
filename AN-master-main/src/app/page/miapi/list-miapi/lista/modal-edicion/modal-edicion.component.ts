import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { Kdrama } from '../../interface/kdrama';
import { KdramaService } from '../../services/kdrama.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal-edicion',
  standalone: true,
  imports: [],
  templateUrl: './modal-edicion.component.html',
  styleUrl: './modal-edicion.component.css'
})
export class ModalEdicionComponent {

  private bootstrapModal: any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(@Inject(PLATFORM_ID) private plataformId: object,
  private _srvKdrama:KdramaService){}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((boostrap) => {
      this.bootstrapModal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(){
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapModal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapModal) {
        this.bootstrapModal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  Agregar(titulo: string, genero: string,
    anoEstreno: string, paisOrigen: string,
    actoresPrincipales: string, sinopsis: string) {

    const newKdrama: Kdrama = {
      titulo: String(titulo),
      genero: genero.split(',').map(g => g.trim()), // Separar los géneros por comas y convertirlos en un arreglo
      anoEstreno: Number(anoEstreno),
      paisOrigen: String(paisOrigen),
      actoresPrincipales: actoresPrincipales.split(',').map(actor => actor.trim()), // Separar los actores por comas y convertirlos en un arreglo
      sinopsis: String(sinopsis)
    };

    this._srvKdrama.postKdrama(newKdrama).subscribe({
      next: (res) => {
        console.log('elemento agregado')
        this.closeModal()
        window.location.reload();
      },
      error: (error) => {
        console.log(`error al agregar un nuevo elemento ${error}`)
      }
    })
  }

}
