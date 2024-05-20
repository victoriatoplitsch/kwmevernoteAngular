import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteService} from "../shared/note.service";
import {NoteFactory} from "../shared/note-factory";
import {Note} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";
import {TagService} from "../shared/tag.service";

@Component({
  selector: 'ke-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm : FormGroup;
  note = NoteFactory.empty();
  isUpdatingNote = false;
  images: FormArray;
  registers: any;
  tags: any[] = [];
  errors:{[key:string]:string} = {};


  constructor(private fb: FormBuilder,
              private ke: NoteService,
              private route: ActivatedRoute,
              private router: Router,
              private registerService: RegisterService,
              private tagService: TagService) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.registerService.getAll().subscribe(registers => {
      this.registers = registers;
    });

    this.tagService.getAll().subscribe(tags => {
      this.tags = tags;
    });

    if(id){ //we're updating an existing list
      this.isUpdatingNote = true;
      this.ke.getSingle(id).subscribe(note => {
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
  }

  initNote(){
    this.buildThumbnailsArray();
    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: this.note.description,
      register_id: this.note.register_id,
      tags: this.note.tags,
      created_at: this.note.created_at,
      updated_at: this.note.updated_at,
      images: this.images
    });

    this.noteForm.statusChanges.subscribe(() =>this.updateErrorMessages());
  }

  private buildThumbnailsArray() {
    if(this.note.images){
      this.images = this.fb.array([]);
      for(let img of this.note.images){
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
    this.noteForm.value.images = this.noteForm.value.images.filter((thumbnail:{url:string}) => thumbnail.url);
    const note  : Note = NoteFactory.fromObject(this.noteForm.value);
    if(this.isUpdatingNote){
      this.ke.update(note).subscribe(res => {
        this.router.navigate(['../../notes', note.id], {relativeTo: this.route});
      });
    } else{
      this.ke.create(note).subscribe( res => {
        console.log(note);
        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(['../notes'], {relativeTo: this.route});
      });
    }
  }

  private updateErrorMessages() {
    this.errors = {};
    for(const message of NoteFormErrorMessages){
      const control = this.noteForm.get(message.forControl);
      if(control && control.dirty && control.invalid &&
        control.errors && control.errors[message.forValidator] && !this.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }
}
