import {Component, OnInit} from '@angular/core';
import {Register} from "../shared/register";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {TodoService} from "../shared/todo.service";
import {TodoFactory} from "../shared/todo-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {NoteService} from "../shared/note.service";
import {Note} from "../shared/note";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-todo-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NoteListItemComponent
  ],
  templateUrl: './todo-details.component.html',
  styles: ``
})
export class TodoDetailsComponent implements OnInit{
  todo: Todo = TodoFactory.empty();
  user: any;
  note: any;

  constructor(private ke:TodoService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              private todoService: TodoService,
              public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ke.getSingle(params['id']).subscribe((t:Todo)=>{this.todo=t
      if (this.todo.user_id) {
        this.todoService.getUserDetails(this.todo.user_id).subscribe(user => {
          this.user = user;

        });
      }

      if (this.todo.note_id) {
        this.todoService.getNoteDetails(this.todo.note_id).subscribe(note => {
          this.note = note;

        });
      }
    });
  }

  removeTodo() {
    if(confirm("Todo wirklich löschen?")){
      this.ke.remove(this.todo.id).subscribe(
        () => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Todo gelöscht!', 'KWMEvernote');
        },
      );
    }
  }
}
