import { Injectable } from '@angular/core';
import { LogService } from 'app/log.service';
import { Subject } from 'rxjs/Subject';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class StarWarsService {

  private characters = [];
  private logService: LogService;
  sideAssigned = new Subject<{name: string, side: string}>();
  charactersChanged = new Subject<void>(); // a subject is like an event emitter, both of which can be subscribed to
                                     // but using a subject is considered best practice
  http: Http;
  characterAddedMessage = new Subject<{name: string, side: string}>();
  charactersFetchedForPages = new Subject<void>();
  addedCharacters = [];
  deletedCharacters = [];
  currentPage: number;

  constructor(logService: LogService, http: Http) {
    this.logService = logService;
    this.http = http;
   }

   fetchCharacters(page) {
     this.currentPage = page;
     this.http.get(`https://swapi.co/api/people/?page=${page}`).map((response: Response) => response.json())
         .subscribe(
          (data) => {
            const characterData = data.results;
            let characters = characterData.map((char) => {
              return {name: char.name, side: ''};
            });
            characters = characters.filter((char) => {
              if (this.deletedCharacters.includes(char.name)) {
                return false;
              } else {
                return true;
              }
            });
            this.characters = characters.slice();
            if (this.currentPage === 1) {
              for (let i = 0;i < this.addedCharacters.length;i++) {
                this.characters.unshift(this.addedCharacters[i]);
              }
              // this.characters.unshift(newChar);
          }
            // if (this.characters.length === 0) {
            //     for (let i = 0;i < this.addedCharacters.length;i++) {
            //       this.characters.unshift(this.addedCharacters[i]);
            //     }
            //     // this.characters.unshift(newChar);
            // }
            
            this.charactersChanged.next();
          }
     );
   }

   charactersTabOnClick() {
    // this.currentPage = page;
    this.http.get(`https://swapi.co/api/people/?page=${this.currentPage}`).map((response: Response) => response.json())
        .subscribe(
         (data) => {
           const characterData = data.results;
           const characters = characterData.map((char) => {
             return {name: char.name, side: ''};
           });
           console.log(characterData);
           this.characters = characters.slice();
           if (this.currentPage === 1) {
               for (let i = 0;i < this.addedCharacters.length;i++) {
                 this.characters.unshift(this.addedCharacters[i]);
               }
               // this.characters.unshift(newChar);
           }
           
           this.charactersChanged.next();
         }
    );
   }


  //  fillPages() {
  //   let page = 1;
  //   let allCharactersToFillPages = [];
    
  //   while(page <= 4) {
  //     this.http.get(`https://swapi.co/api/people/?page=${page}`).map((response: Response) => response.json())
  //     .subscribe(
  //      (data) => {
  //        const characterData = data.results;
  //        const characters = characterData.map((char) => {
  //          return {name: char.name, side: ''};
  //        });
         
  //        allCharactersToFillPages = allCharactersToFillPages.concat(characters).slice();
  //        console.log('allCharactersToFillPages from service', allCharactersToFillPages);
  //        if (page === 4) {
  //         console.log('should return', allCharactersToFillPages);
  //         return allCharactersToFillPages;      
  //       }
        
  //      }
  // );

  //   console.log('PAGE', allCharactersToFillPages);
    
    
    
  //   page++;
  //   }
  //   console.log('SHOULD RETURN THIS', allCharactersToFillPages);
    
  //   this.charactersFetchedForPages.next();
  //   console.log('SHOULD RETURN THIS', allCharactersToFillPages);
    
  //  }


  getCharacters(chosenList) {
    if (chosenList === 'all') {
      return this.characters.slice();
    }
    return this.characters.filter(char => char.side.toLowerCase() === chosenList);
  }

  onSideChosen(charInfo) {
    const pos = this.characters.findIndex( char => char.name === charInfo.name );
    this.characters[pos].side = charInfo.side;
    this.sideAssigned.next(charInfo); // no value passed here b/c we set our Subject to 'void'
    this.charactersChanged.next();
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
    this.addedCharacters.push(newChar);

    this.characterAddedMessage.next(newChar);
  }

  deleteCharacter(name) {
    // console.log('delete ran', name);
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    });
    // console.log(pos);

    this.deletedCharacters.push(this.characters[pos].name);
    this.characters.splice(pos, 1);
    this.charactersChanged.next();
  }

}
