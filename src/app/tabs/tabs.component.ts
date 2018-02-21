import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  characters = [
    {name: 'Luke Skywalker', side: 'Light'},
    {name: 'Darth Vader', side: 'Dark'},
  ];
  chosenList = 'all';
  try = 'all';

  constructor() { }

  ngOnInit() {
  }

  onChoose(side) {
    this.chosenList = side;
  }


  getCharacters() {
    if (this.chosenList === 'all') {
      console.log('tabs characters if all', this.chosenList.slice());
      return this.characters.slice();
    }
    console.log('tabs characters not if', this.characters.filter(char => char.side === this.chosenList));
    console.log('tabs characters not if chosenList:', this.chosenList);
    return this.characters.filter(char => char.side.toLowerCase() === this.chosenList);
  }

}
