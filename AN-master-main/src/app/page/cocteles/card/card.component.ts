import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { cocteles } from '../interfaces/cocteles';
import { NgFor, NgIf } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgFor, NgIf, ModalComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnChanges{
  @Input() public cocteles:cocteles| undefined
  loadingImg:boolean = false
  @ViewChild(ModalComponent) public modal!:ModalComponent

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['cocteles']){
        this.loadingImg = false
      }
  }

  openModal(cocteles: Partial<cocteles['drinks'][number]>){
    if(this.modal){
      this.modal.open(cocteles)
    }
  }
}
