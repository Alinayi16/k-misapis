import { Component, ElementRef, EventEmitter, Inject, Input, output, PLATFORM_ID, ViewChild } from '@angular/core';
import { allKdrama, Kdrama } from '../interface/kdrama';
import { KdramaService } from '../services/kdrama.service';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal-creacion',
  standalone: true,
  imports: [NgIf],
  templateUrl: './modal-creacion.component.html',
  styleUrl: './modal-creacion.component.css'
})
export class ModalCreacionComponent {
  @Input() ejemplo:Kdrama  = {
    titulo: '',
    genero: [],
    anoEstreno: 0,
    paisOrigen: '',
    actoresPrincipales: [],
    sinopsis: ''
  }
  private bootstrapmodal:any
  @ViewChild('modalElement') public modal!:ElementRef
  constructor(private _srvKdrama:KdramaService,
    @Inject(PLATFORM_ID) private plataformId: object
  ){}

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
      this.bootstrapmodal = new boostrap.Modal(this.modal.nativeElement);
    });
  }

  open(ejemplo: Kdrama) {
    this.ejemplo = ejemplo;
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.show();
      } else {
        this.inicializarModal();
        setTimeout(() => {
          this.bootstrapmodal.show();
        }, 0);
      }
    }
  }

  closeModal() {
    if (isPlatformBrowser(this.plataformId)) {
      if (this.bootstrapmodal) {
        this.bootstrapmodal.hide();
      } else {
        console.error('El modal no está inicializado.');
      }
    }
  }

  editarDrama(titulo: string, genero: string, anoEstreno: string, paisOrigen: string, actoresPrincipales: string, sinopsis: string, id: string): void {
    // Convertir los valores de género y actoresPrincipales de vuelta a arrays
    const generoArray = genero.split(',').map(item => item.trim());
    const actoresArray = actoresPrincipales.split(',').map(item => item.trim());
  
    const updatedDrama: Kdrama = {
      _id: id,
      titulo: titulo,
      genero: generoArray,
      anoEstreno: Number( anoEstreno),
      paisOrigen: paisOrigen,
      actoresPrincipales: actoresArray,
      sinopsis: sinopsis
    };
  
    this._srvKdrama.putKdrama(id, updatedDrama).subscribe({
      next: (response) => {
        console.log('Drama actualizado correctamente', response);
        window.location.reload();
        this.closeModal()
      },
      error: (err) => {
        console.error('Error al actualizar el drama', err);
      }
    });
  }
  
}
