import { Injectable } from '@angular/core';
import { LogService } from 'app/log.service';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StarWarsService {

  private characters = [
    {name: 'Luke Skywalker', side: 'light'},
    {name: 'Darth Vader', side: 'dark'}
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>(); // a subject is like an event emitter, both of which can be subscribed to
                                     // but using a subject is considered best practice 
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
    this.charactersChanged.next(); // no value passed here b/c we set our Subject to 'void'
    this.logService.writeLog(`changed side of ${charInfo.name}. New side: ${charInfo.side}`);
  }

  addCharacter(name, side) {
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    if (pos !== -1) {
      return;
    }
    const newChar = {name: name, side: side};
    this.characters.push(newChar);
  }

}
