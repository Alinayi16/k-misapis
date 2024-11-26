import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/auth'
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, NgIf, NgFor, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  user$!: Observable<firebase.User | null>
  isLoadig:boolean = false
  errorMesages:string = ''

  constructor(private _srvAuth:AuthService){}

  ngOnInit(): void{
    this.user$ = this._srvAuth.getUser()
  }

  async onGoogleLogin():Promise<void>{
    try{
      await this._srvAuth.loginGoogle()
      console.log('inicio exitoso')
    }catch(error){
      this.errorMesages = 'Error en la autenticacion de google'
      console.log(error)
      throw error 
    }finally{
      this.isLoadig = false
    }
  }

  async logOut():Promise<void>{
    this.isLoadig = true
    try{
      await this._srvAuth.logout();
      console.log('Cierre de secion exitoso')
    }catch(error){
      this.errorMesages =  'error al cerrar secion'
      console.log(error)
    }finally{
      this.isLoadig = false
    }
  }
}
