import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Register, User} from "../shared/register";
import {RegisterListItemComponent} from "../register-list-item/register-list-item.component";
import {RouterLink} from "@angular/router";
import { RegisterService} from "../shared/register.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-register-list',
  standalone: true,
  imports: [
    RegisterListItemComponent,
    RouterLink
  ],
  templateUrl: './register-list.component.html',
  styles: ``
})
export class RegisterListComponent implements OnInit{
  registers: Register[] = [];

  constructor(private ke:RegisterService, public authService: AuthenticationService) {
  }
  ngOnInit() {
    this.ke.getAll().subscribe(res => this.registers = res);
  }

}
