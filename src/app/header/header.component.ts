import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private swService: StarWarsService) { }

  ngOnInit() {
  }

  fetchCharacters() {
    this.swService.charactersTabOnClick();
  }

}
