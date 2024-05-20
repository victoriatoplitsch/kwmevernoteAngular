import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterFactory} from "../shared/register-factory";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Register} from "../shared/register";
import {RegisterFormErrorMessages} from "../register-form/register-form-error-messages";
import {TodoFactory} from "../shared/todo-factory";
import {TodoService} from "../shared/todo.service";
import {TodoFormErrorMessages} from "./todo-form-error-messages";
import {Todo} from "../shared/todo";
import {UserService} from "../shared/user.service";
import {NoteService} from "../shared/note.service";
import {TagService} from "../shared/tag.service";

@Component({
  selector: 'ke-todo-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './todo-form.component.html',
  styles: ``
})
export class TodoFormComponent implements OnInit{
  todoForm : FormGroup;
  todo = TodoFactory.empty();
  isUpdatingTodo = false;
  errors:{[key:string]:string} = {};
  users: any;
  notes: any;
  images: FormArray;
  tags: any[] = [];


  constructor(private fb: FormBuilder,
              private ke: TodoService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private noteService: NoteService,
              private tagService: TagService) {
    this.todoForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.noteService.getAll().subscribe(notes => {
      this.notes = notes;
    });
    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
    });
    if(id){ //we're updating an existing list
      this.isUpdatingTodo = true;
      this.ke.getSingle(id).subscribe(todo => {
        this.todo = todo;
        this.initTodo();
      });
    }
    this.initTodo();
  }

  initTodo(){
    this.buildThumbnailsArray();
    this.todoForm = this.fb.group({
      id: this.todo.id,
      title: [this.todo.title, Validators.required],
      description: this.todo.description,
      due_date: [this.todo.due_date, Validators.required],
      user_id: [this.todo.user_id, Validators.required],
      note_id: this.todo.note_id,
      tags: this.todo.tags,
      created_at: this.todo.created_at,
      updated_at: this.todo.updated_at,
      images: this.images
    });

    this.todoForm.statusChanges.subscribe(() =>this.updateErrorMessages());
  }

  private buildThumbnailsArray() {
    if(this.todo.images){
      this.images = this.fb.array([]);
      for(let img of this.todo.images){
        let fg = this.fb.group({
          id:this.fb.control(img.id),
          url: this.fb.control(img.url),
          caption: this.fb.control(img.caption)
        });
        this.images.push(fg);
      }
    }
  }

  addThumbnailControl() {
    this.images.push(this.fb.group({id: 0, url:'', caption: null}));
  }


  submitForm() {
    this.todoForm.value.images = this.todoForm.value.images.filter((thumbnail:{url:string}) => thumbnail.url);
    const todo  : Todo = TodoFactory.fromObject(this.todoForm.value);

    if(this.isUpdatingTodo){
      this.ke.update(todo).subscribe(res => {
        this.router.navigate(['../../todos', todo.id], {relativeTo: this.route});
      });
    } else{

      this.ke.create(todo).subscribe( res => {
        console.log(todo);
        this.todo = TodoFactory.empty();
        this.todoForm.reset(TodoFactory.empty());
        this.router.navigate(['../todos'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of TodoFormErrorMessages){
      const control = this.todoForm.get(message.forControl);
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
