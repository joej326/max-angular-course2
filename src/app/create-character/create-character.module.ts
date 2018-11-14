import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CreateCharacterComponent } from 'app/create-character/create-character.component';
import { RouterModule } from '@angular/router';

const createCharacterRoutes = [
  { path: '', component: CreateCharacterComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(createCharacterRoutes)
  ],
  declarations: [
    CreateCharacterComponent
  ]
})
export class CreateCharacterModule { }
