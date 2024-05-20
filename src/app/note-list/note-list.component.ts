import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RegisterListItemComponent} from "../register-list-item/register-list-item.component";
import {Register, User} from "../shared/register";
import {Note} from "../shared/note";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {RegisterService} from "../shared/register.service";
import {NoteService} from "../shared/note.service";
import {RouterLink} from "@angular/router";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-note-list',
  standalone: true,
  imports: [
    NoteListItemComponent,
    RouterLink
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];

  constructor(private ke:NoteService, public authService: AuthenticationService) {
  }
  ngOnInit() {
    this.ke.getAll().subscribe(res => this.notes = res);
  }
}
