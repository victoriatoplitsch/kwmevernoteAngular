import {Component, Input} from '@angular/core';
import {Todo} from "../shared/todo";
import {Tag} from "../shared/tag";

@Component({
  selector: 'a.ke-tag-list-item',
  standalone: true,
  imports: [],
  templateUrl: './tag-list-item.component.html',
  styles: ``
})
export class TagListItemComponent {
  @Input() tag:Tag | undefined;
}
