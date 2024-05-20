import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {RegisterListComponent} from "./register-list/register-list.component";
import {RegisterDetailsComponent} from "./register-details/register-details.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoListComponent} from "./todo-list/todo-list.component";
import {TodoDetailsComponent} from "./todo-details/todo-details.component";
import {TagListComponent} from "./tag-list/tag-list.component";
import {TagDetailsComponent} from "./tag-details/tag-details.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TodoFormComponent} from "./todo-form/todo-form.component";
import {TagFormComponent} from "./tag-form/tag-form.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registers', component: RegisterListComponent},
  {path: 'registers/:id', component: RegisterDetailsComponent},
  {path:'adminRegister', component:RegisterFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminRegister/:id', component:RegisterFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminNote', component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminNote/:id', component:NoteFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodo', component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTodo/:id', component:TodoFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTag', component:TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path:'adminTag/:id', component:TagFormComponent, canActivate:[canNavigateToAdminGuard]},
  {path: 'notes', component: NoteListComponent},
  {path: 'notes/:id', component: NoteDetailsComponent},
  {path: 'todos', component: TodoListComponent},
  {path: 'todos/:id', component: TodoDetailsComponent},
  {path: 'tags', component: TagListComponent},
  {path: 'tags/:id', component: TagDetailsComponent},
  {path: 'login', component: LoginComponent}
];
