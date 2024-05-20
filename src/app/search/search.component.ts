import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Tag} from "../shared/tag";
import {TagService} from "../shared/tag.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'ke-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter <string>();
  foundTags: Tag[] = [];
  isLoading = false;
  @Output() tagSelected = new EventEmitter<Tag>();

  constructor(private ke:TagService) {
  }

  ngOnInit() {
    this.keyup.pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(()=>this.isLoading = true))
      .pipe(switchMap(searchTerm => this.ke.getAllSearch(searchTerm)))
      .pipe(tap(()=>this.isLoading = false))
      .subscribe((tags) => {
        this.foundTags = tags;
        console.log(tags);
      });
  }
}
