import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Todo} from "../shared/todo";
import {TodoService} from "../shared/todo.service";
import {TagService} from "../shared/tag.service";
import {Tag} from "../shared/tag";
import {TagFactory} from "../shared/tag-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../shared/authentication.service";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {Note} from "../shared/note";
import {NoteService} from "../shared/note.service";

@Component({
  selector: 'ke-tag-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    TodoListItemComponent,
    NoteListItemComponent
  ],
  templateUrl: './tag-details.component.html',
  styles: ``
})
export class TagDetailsComponent implements OnInit{
  tag: Tag = TagFactory.empty();
  todos : Todo[] = [];
  notes: Note[] = [];

  constructor(private ke:TagService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              public authService: AuthenticationService,
              public todoService: TodoService,
              public noteService: NoteService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ke.getSingle(params['id']).subscribe((t:Tag)=>this.tag=t);

    this.todoService.getAll().subscribe(res => {
      this.todos = res
      this.todos = this.todos.filter((todo)=>todo.note_id == Number(this.tag.id));
    });

    this.noteService.getAll().subscribe(res => {
      this.notes = res
      console.log(res)
      this.notes = this.notes.filter((note)=>note.register_id == Number(this.tag.id));
    });
  }
  removeTag() {
    if(confirm("Tag wirklich löschen?")){
      this.ke.remove(this.tag.id).subscribe(
        () => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Tag gelöscht!', 'KWMEvernote');
        },
      );
    }
  }
}
