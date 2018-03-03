import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'app/star-wars.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  characters: {}[];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription;

  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        this.characters = this.swService.getCharacters(params.side); // IMPORTANT the '.side' has to match the :side parameter!
        this.loadedSide = params.side;
      }
    );
    // how our Subject worked:
    // inside our swService we setup a Subject to emit an event. Then, inside our swService onSideChosen method
    // we change the character's side, therefore we invoked the Subject inside that method with a '.next()'.
    // in the line below we subscribe to the subject to be notified when a character changes. When that happens,
    // we update the characters with this.loadedSide.
    this.subscription = this.swService.charactersChanged.subscribe(
      // no data b/c remember our Subject is void, therefore our 'next()' is empty
      () => { 
        this.characters = this.swService.getCharacters(this.loadedSide);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
