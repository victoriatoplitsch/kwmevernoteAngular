import {Component, Input, Output} from '@angular/core';
import {Register} from "../shared/register";
import {NoteListComponent} from "../note-list/note-list.component";
import {NgClass} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'a.ke-register-list-item',
  standalone: true,
  imports: [
    NoteListComponent,
    NgClass
  ],
  templateUrl: './register-list-item.component.html',
  styles: ``
})
export class RegisterListItemComponent {
  @Input() register:Register | undefined;

  constructor(public authService: AuthenticationService) {
  }
}
