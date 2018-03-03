import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { StarWarsService } from 'app/star-wars.service';
import { LogService } from 'app/log.service';
import { CreateCharacterComponent } from './create-character/create-character.component';
import { HeaderComponent } from './header/header.component';


const routes = [
  { path: 'characters', component: TabsComponent, children: [
    { path: '', redirectTo: 'all', pathMatch: 'full' }, // this is here so that if the user goes to just '/characters'
    { path: ':side', component: ListComponent } // angular will append 'all' so its '/characters/all'
  ] },
  { path: 'new-character', component: CreateCharacterComponent },
  { path: '**', redirectTo: 'characters' }, // wild card must be added at the end of your paths!
];



@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    ListComponent,
    ItemComponent,
    CreateCharacterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  // note: services can only be injected into other services if they are provided in the app module
  providers: [StarWarsService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
