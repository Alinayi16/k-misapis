import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Dbz, Dbzs } from '../interfaces/dbzs';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'Dbz-card',
  standalone: true,
  imports: [NgIf, NgFor, ModalComponent],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'] 
})
export class CardComponent implements OnChanges {
  @Input() public dbzAll: Dbzs | undefined; 
  @ViewChild(ModalComponent) public modal!: ModalComponent
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dbzAll']) { 
      this.dbzAll = changes['dbzAll'].currentValue;
    }
  }

  openModal(personaje: Dbz): void {
    if (this.modal) {
      this.modal.open(personaje);
    }
  }

}
