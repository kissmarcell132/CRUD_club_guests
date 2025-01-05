import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GuestModel } from '../models/guest-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:3000/guestList"
  constructor(private http: HttpClient) { }

  getGuests(): Observable<GuestModel[]>{
    return this.http.get<GuestModel[]>(this.url);
  }

  addGuest(guest: GuestModel): Observable<GuestModel>{
    return this.http.post<GuestModel>(this.url, guest)
  }

  modifyGuest(guest: GuestModel): Observable<GuestModel>{
    return this.http.put<GuestModel>(`${this.url}/${guest.id}`, guest)
  }

  deleteGuest(guest: GuestModel): Observable<GuestModel>{
    return this.http.delete<GuestModel>(`${this.url}/${guest.id}`)
  }
}
