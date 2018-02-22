import { Injectable } from '@angular/core';
import { LogService } from 'app/log.service';

@Injectable()
export class StarWarsService {

  private characters = [
    {name: 'Luke Skywalker', side: 'light'},
    {name: 'Darth Vader', side: 'dark'}
  ];
  private logService: LogService;

  constructor(logService: LogService) {
    this.logService = logService;
   }




  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter(char => char.side.toLowerCase() === chosenList);
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex( char => char.name === charInfo.name );
    this.characters[pos].side = charInfo.side;
    this.logService.writeLog(`changed side of ${charInfo.name}. New side: ${charInfo.side}`);
  }

}
