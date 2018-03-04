import { Injectable } from '@angular/core';
import { LogService } from 'app/log.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class StarWarsService {

  private characters = [];
  private logService: LogService;
  charactersChanged = new Subject<void>(); // a subject is like an event emitter, both of which can be subscribed to
                                     // but using a subject is considered best practice 
  http: Http;
  characterAddedMessage = new Subject<{name: string, side: string}>();

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
   }

   fetchCharacters(page) {
     console.log('service page', page);
     this.http.get(`https://swapi.co/api/people/?page=${page}`).map((response: Response) => response.json())
         .subscribe(
          (data) => {
            console.log('raw data:', data);
            const characterData = data.results;
            const characters = characterData.map((char) => {
              return {name: char.name, side: ''};
            });
            console.log(characterData);
            this.characters = characters;
            this.charactersChanged.next();
          }
     );
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

    this.characterAddedMessage.next(newChar);
  }

}
