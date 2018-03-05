import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  swService: StarWarsService;
  characterAdded = false;
  characterAddedMessage: string;
  sideAssignedMessage: string;

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit() {
    this.swService.fetchCharacters(1);
    this.swService.sideAssigned.subscribe(
      (character) => {
        this.sideAssignedMessage = `${character.name} has joined the ${character.side} side!`;
        setTimeout(() => {
          this.sideAssignedMessage = '';
        }, 3000);
      }
    );
    this.swService.characterAddedMessage.subscribe(
      (newChar) => {
        this.characterAdded = true;
        this.characterAddedMessage = `Character ${newChar.name} of the ${newChar.side} side has been added!`;
        setTimeout(() => {
          this.characterAdded = false;
        }, 3000);
      }
    );
  }
}
