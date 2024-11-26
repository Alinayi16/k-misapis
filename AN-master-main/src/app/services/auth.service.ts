import { inject, Injectable } from '@angular/core';
import { Auth, authState, GoogleAuthProvider, signInWithPopup, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth:Auth = inject(Auth);
  private router: Router = inject(Router);
  user$: Observable<User | null> = authState(this.auth)
  constructor() { }

  async loginGoogle(): Promise<void>{
    try{
      const provaider = new GoogleAuthProvider()
      await signInWithPopup(this.auth, provaider)
    }catch(error){
      console.log(error)
      throw error;
    }
  }

  async logout(){
    try{
      await this.auth.signOut()
      this.router.navigate(['/home'])
    }catch(error){
      console.log(error)
      throw error 
    }
  }

  getUser(): Observable<User | null>{
    return this.user$
  }

}
