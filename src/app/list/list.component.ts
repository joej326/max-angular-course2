import { Component, OnInit, Input } from '@angular/core';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, DoCheck {
  @Input() characters: {}[];

  constructor() { }

  ngOnInit() {

  }

    ngDoCheck() {
      console.log('list component characters:', this.characters);
    }

}
