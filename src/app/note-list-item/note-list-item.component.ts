import {Component, Input} from '@angular/core';
import {Register} from "../shared/register";
import {Note} from "../shared/note";

@Component({
  selector: 'a.ke-note-list-item',
  standalone: true,
  imports: [],
  templateUrl: './note-list-item.component.html',
  styles: ``
})
export class NoteListItemComponent {
  @Input() note:Note | undefined;
}
