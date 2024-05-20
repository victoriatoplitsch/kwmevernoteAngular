import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {Tag} from "../shared/tag";

@Component({
  selector: 'ke-home',
  standalone: true,
    imports: [
        RouterLink,
        SearchComponent
    ],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) {


  }

  tagSelected(tag: Tag) {
    this.router.navigate(['../tags', tag.id], {relativeTo: this.route})
  }
}
