import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GuestModel } from '../models/guest-model';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [],
  templateUrl: './guest.component.html',
  styleUrl: './guest.component.css'
})
export class GuestComponent {
  @Input() guestData: GuestModel | undefined = undefined;
  @Output() saved = new EventEmitter<GuestModel>();

  getData(event: any):string {
    return event.target.value;
  }

  getNumberData(event: any):number {
    return Number(event.target.value);
  }

  save(){
    // TODO ellenőrzés
    if(!this.guestData?.fullName || !this.guestData?.country || !this.guestData?.email || this.guestData.gender == "Válassz...")
      alert("Minden mezőt ki kell tölteni");
    else
      this.saved.emit(this.guestData);
  }
}
