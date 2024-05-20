import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Register} from "../shared/register";
import {NoteListComponent} from "../note-list/note-list.component";
import {RegisterService} from "../shared/register.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RegisterFactory} from "../shared/register-factory";
import {ToastrService} from "ngx-toastr";
import {DatePipe, NgIf} from "@angular/common";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {Note} from "../shared/note";
import {NoteService} from "../shared/note.service";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'ke-register-details',
  standalone: true,
  imports: [
    NoteListComponent,
    RouterLink,
    DatePipe,
    NoteListItemComponent,
    NgIf
  ],
  templateUrl: './register-details.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.Default
})
export class RegisterDetailsComponent implements OnInit{
  register: Register = RegisterFactory.empty();
  user: any;
  notes: Note[] = [];

  constructor(private ke:RegisterService,
              private route:ActivatedRoute,
              private router:Router,
              private toastr:ToastrService,
              private registerService: RegisterService,
              private noteService:NoteService,
              public authService: AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ke.getSingle(params['id']).subscribe((r:Register)=>{
      this.register=r

      if (this.register.user_id) {
        this.registerService.getUserDetails(Number(this.register.user_id)).subscribe(user => {
          this.user = user;
        });
      }
    });
      this.noteService.getAll().subscribe(res => {
        this.notes = res
        console.log(res)
        this.notes = this.notes.filter((note)=>note.register_id == Number(this.register.id));
      });

  }


  removeRegister() {
    if(confirm("Liste wirklich löschen?")){
      this.ke.remove(this.register.id).subscribe(
        () => {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Liste gelöscht!', 'KWMEvernote');
        },
      );
    }
  }
}
