import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestModel } from './models/guest-model';
import { DataService } from './services/data.service';
import { GuestComponent } from "./guest/guest.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, GuestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  guests: GuestModel[] = [];
  modify: GuestModel | undefined;
  new: GuestModel | undefined;

  constructor(private dataService: DataService) { }

  ngOnInit(){
    this.dataService.getGuests().subscribe({
      next: (data: GuestModel[]) => {
        this.guests = data;
      },
      error: (err) => console.log(err)
    });
  }

  newGuest(){
    this.new = {
      id: undefined,
      country: '',
      email: '',
      fullName: '',
      gender: '',
      expectedSpending: 10000,
      numberOfFriends: 1
    }
  }

  saveNew(guest: GuestModel){
    this.dataService.addGuest(guest).subscribe({
      next: (data: GuestModel) =>{
        this.guests.push(data);
        this.new = undefined;
      },
      error: (err) => console.log(err)
    });
  }

  modifyGuest(guest: GuestModel){
    this.modify = JSON.parse(JSON.stringify(guest));
  }

  saveModified(guest: GuestModel){
    this.dataService.modifyGuest(guest).subscribe({
      next: (data: GuestModel) =>{
        const index = this.guests.findIndex(g => g.id == data.id);
        this.guests[index] = data;
        this.modify = undefined;
      },
      error: (err) => console.log(err)
    });
  }

  deleteGuest(guest: GuestModel){
    this.dataService.deleteGuest(guest).subscribe({
      next: (data: GuestModel) =>{
        const index = this.guests.findIndex(g => g.id == data.id);
        this.guests.splice(index, 1);
      },
      error: (err) => console.log(err)
    });
  }

}
