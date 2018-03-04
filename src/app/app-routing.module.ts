import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TabsComponent } from 'app/tabs/tabs.component';
import { ListComponent } from 'app/list/list.component';
import { CreateCharacterComponent } from 'app/create-character/create-character.component';




const routes = [
  { path: 'characters', component: TabsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' }, // this is here so that if the user goes to just '/characters'
    { path: ':side', component: ListComponent } // angular will append 'all' so its '/characters/all'
  ] },
  { path: 'new-character', component: CreateCharacterComponent },
  { path: '**', redirectTo: 'characters' }, // wild card must be added at the end of your paths!
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
