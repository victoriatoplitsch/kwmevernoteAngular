import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {TodoFactory} from "../shared/todo-factory";
import {TodoService} from "../shared/todo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Todo} from "../shared/todo";
import {TodoFormErrorMessages} from "../todo-form/todo-form-error-messages";
import {TagFactory} from "../shared/tag-factory";
import {TagService} from "../shared/tag.service";
import {Tag} from "../shared/tag";
import {TagFormErrorMessages} from "./tag-form-error-messages";

@Component({
  selector: 'ke-tag-form',
  standalone: true,
    imports: [
        ReactiveFormsModule
    ],
  templateUrl: './tag-form.component.html',
  styles: ``
})
export class TagFormComponent implements OnInit{
  tagForm : FormGroup;
  tag = TagFactory.empty();
  isUpdatingTag = false;
  errors:{[key:string]:string} = {};

  constructor(private fb: FormBuilder,
              private ke: TagService,
              private route: ActivatedRoute,
              private router: Router) {
    this.tagForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){ //we're updating an existing list
      this.isUpdatingTag = true;
      this.ke.getSingle(id).subscribe(tag => {
        this.tag = tag;
        this.initTag();
      });
    }
    this.initTag();
  }

  initTag(){
    this.tagForm = this.fb.group({
      id: this.tag.id,
      name: [this.tag.name, Validators.required],
      created_at: this.tag.created_at,
      updated_at: this.tag.updated_at
    });

    this.tagForm.statusChanges.subscribe(() =>this.updateErrorMessages());
  }


  submitForm() {
    const tag  : Tag = TagFactory.fromObject(this.tagForm.value);
    console.log(tag);
    if(this.isUpdatingTag){
      this.ke.update(tag).subscribe(res => {
        this.router.navigate(['../../tags', tag.id], {relativeTo: this.route});
      });
    } else{
      this.ke.create(tag).subscribe( res => {
        this.tag = TagFactory.empty();
        this.tagForm.reset(TagFactory.empty());
        this.router.navigate(['../tags'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of TagFormErrorMessages){
      const control = this.tagForm.get(message.forControl);
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
