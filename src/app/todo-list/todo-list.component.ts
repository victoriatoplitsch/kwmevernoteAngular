import {Component, OnInit} from '@angular/core';
import {Register} from "../shared/register";
import {RegisterService} from "../shared/register.service";
import {Todo} from "../shared/todo";
import {TodoService} from "../shared/todo.service";
import {RegisterListItemComponent} from "../register-list-item/register-list-item.component";
import {RouterLink} from "@angular/router";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-todo-list',
  standalone: true,
  imports: [
    RegisterListItemComponent,
    RouterLink,
    TodoListItemComponent
  ],
  templateUrl: './todo-list.component.html',
  styles: ``
})
export class TodoListComponent implements OnInit{
  todos: Todo[] = [];

  constructor(private ke:TodoService, public authService: AuthenticationService) {
  }
  ngOnInit() {
    this.ke.getAll().subscribe(res => this.todos = res);
  }
}
