import {Component, OnInit} from '@angular/core';
import {Todo} from "../shared/todo";
import {TodoService} from "../shared/todo.service";
import {TagService} from "../shared/tag.service";
import {Tag} from "../shared/tag";
import {TodoListItemComponent} from "../todo-list-item/todo-list-item.component";
import {RouterLink} from "@angular/router";
import {TagListItemComponent} from "../tag-list-item/tag-list-item.component";
import {SearchComponent} from "../search/search.component";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-tag-list',
  standalone: true,
  imports: [
    TodoListItemComponent,
    RouterLink,
    TagListItemComponent,
    SearchComponent
  ],
  templateUrl: './tag-list.component.html',
  styles: ``
})
export class TagListComponent implements OnInit{
  tags: Tag[] = [];

  constructor(private ke:TagService, public authService: AuthenticationService) {
  }
  ngOnInit() {
    this.ke.getAll().subscribe(res => this.tags = res);
  }
}
