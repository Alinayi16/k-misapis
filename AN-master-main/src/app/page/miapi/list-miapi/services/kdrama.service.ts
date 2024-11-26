import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { allKdrama, Kdrama } from '../interface/kdrama';

@Injectable({
  providedIn: 'root'
})
export class KdramaService {
  urlK = 'http://localhost:3000/api/kdrama'
  constructor(private http:HttpClient) { }

  getAllKdram():Observable<allKdrama>{
    return this.http.get<allKdrama>(`${this.urlK}`)
  }

  postKdrama(elemento:Kdrama):Observable<Kdrama>{
    return this.http.post<Kdrama>(`${this.urlK}`, elemento)
  }

  putKdrama(id:String, elemento:Kdrama):Observable<Kdrama>{
    return this.http.put<Kdrama>(`${this.urlK}/${id}`, elemento)
  }

  deleteKdrama(id:String){
    return this.http.delete(`${this.urlK}/${id}`)
  }
}
