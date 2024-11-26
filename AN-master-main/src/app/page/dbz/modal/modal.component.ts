import { Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { Dbz } from '../interfaces/dbzs';
import { isPlatformBrowser, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() personajeDbz: Dbz = {
    id: 0,
    name: '',
    ki: '',
    maxKi: '',
    race: '',
    gender: '',
    description: '',
    image: '',
    affiliation: '',
    deletedAt: null,
    originPlanet: {
      id: 0,
      name: '',
      isDestroyed: false,
      description: '',
      image: '',
      deletedAt: null,
    },
    transformations: [], // transformations se inicializa como un arreglo vacío
  };

  private bootstrapModal: any;
  @ViewChild('modalElement') public modal!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private plataformId: object) { }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.plataformId)) {
      this.inicializarModal();
    }
    if (this.modal) {
      console.log('Modal inicializado:', this.modal);
    }
  }

  inicializarModal() {
    import('bootstrap').then((bootstrap) => {
      this.bootstrapModal = new bootstrap.Modal(this.modal.nativeElement);
    });
  }

  open(personaje: Dbz): void {
    this.personajeDbz = personaje;
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

}
