import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {RegisterListComponent} from "./register-list/register-list.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {Register} from "./shared/register";
import {RegisterDetailsComponent} from "./register-details/register-details.component";
import {Note} from "./shared/note";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'ke-root',
  standalone: true,
  imports: [RouterOutlet, RegisterListComponent, NoteListComponent, RegisterDetailsComponent, NoteDetailsComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private authService: AuthenticationService) {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  getLoginLabel(){
    return this.isLoggedIn() ? "Logout" : "Login";
  }


}
