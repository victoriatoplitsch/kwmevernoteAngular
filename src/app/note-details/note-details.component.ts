import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Register} from "../shared/register";
import {Note} from "../shared/note";
import {NoteListComponent} from "../note-list/note-list.component";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NoteService} from "../shared/note.service";
import {NoteFactory} from "../shared/note-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {TodoService} from "../shared/todo.service";
import {Todo} from "../shared/todo";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-note-details',
  standalone: true,
  imports: [
    NoteListComponent,
    RouterLink,
    DatePipe,
    NoteListItemComponent,
    TodoListItemComponent
  ],
  templateUrl: './note-details.component.html',
  styles: ``
})
export class NoteDetailsComponent implements OnInit{
  note:Note = NoteFactory.empty();
  register : any;
  todos : Todo[] = [];

  constructor(private ke:NoteService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              private noteService: NoteService,
              private todoService:TodoService,
              public authService: AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ke.getSingle(params['id']).subscribe((n:Note)=>{this.note=n

      if (this.note.register_id) {
        this.noteService.getRegisterDetails(this.note.register_id).subscribe(register => {
          this.register = register;

        });
      }
    });
    this.todoService.getAll().subscribe(res => {
      this.todos = res
      console.log(res)
      this.todos = this.todos.filter((todo)=>todo.note_id == Number(this.note.id));
    });
  }

  removeNote() {
    if(confirm("Notiz wirklich löschen?")){
      this.ke.remove(this.note.id).subscribe(
        () => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Notiz gelöscht!', 'KWMEvernote');
        },
      );
    }
  }
}
