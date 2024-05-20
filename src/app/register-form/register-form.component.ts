import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterFactory} from "../shared/register-factory";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RegisterFormErrorMessages} from "./register-form-error-messages";
import {Register} from "../shared/register";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'ke-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register-form.component.html',
  styles: ``
})
export class RegisterFormComponent implements OnInit{
  registerForm : FormGroup;
  register = RegisterFactory.empty();
  isUpdatingRegister = false;
  errors:{[key:string]:string} = {};
  users: any;

  constructor(private fb: FormBuilder,
              private ke: RegisterService,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
    this.registerForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    if(id){ //we're updating an existing list
      this.isUpdatingRegister = true;
      this.ke.getSingle(id).subscribe(register => {
        this.register = register;
        this.initRegister();


      });
    }
    this.initRegister();
  }

  initRegister(){
    this.registerForm = this.fb.group({
      id: this.register.id,
      name: [this.register.name, Validators.required],
      is_public: [this.register.is_public, Validators.required],
      user_id: [this.register.user_id, Validators.required],
      created_at: this.register.created_at,
      updated_at: this.register.updated_at
    });

    this.registerForm.statusChanges.subscribe(() =>this.updateErrorMessages());
  }


  submitForm() {
    const register  : Register = RegisterFactory.fromObject(this.registerForm.value);
    if(this.isUpdatingRegister){
      this.ke.update(register).subscribe(res => {
        this.router.navigate(['../../registers', register.id], {relativeTo: this.route});
      });
    } else{
      this.ke.create(register).subscribe( res => {
        this.register = RegisterFactory.empty();
        this.registerForm.reset(RegisterFactory.empty());
        this.router.navigate(['../registers'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of RegisterFormErrorMessages){
      const control = this.registerForm.get(message.forControl);
      if(control && control.dirty && control.invalid &&
      control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
