import { Component, OnInit } from '@angular/core';
import { StarWarsService } from 'app/star-wars.service';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {

  availableSides = [
    {display: 'None', value: ''},
    {display: 'Light', value: 'light'},
    {display: 'Dark', value: 'dark'}

  ];
  selectInvalid = false;
  swService: StarWarsService;
  defaultName = 'Clone';

  constructor(swService: StarWarsService) {
    this.swService = swService;
   }

  ngOnInit() {
  }

  checkSelectValidity(selectElement) {
    if (selectElement.value === '' && selectElement.touched) {
      this.selectInvalid = true;
    }
  }

  onSubmit(submittedForm) {
    this.swService.addCharacter(submittedForm.value.name, submittedForm.value.side);
  }

}
