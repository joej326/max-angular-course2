import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DoCheck } from '@angular/core/src/metadata/lifecycle_hooks';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from 'app/star-wars.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  characters: {}[];
  activatedRoute: ActivatedRoute;
  swService: StarWarsService;
  loadedSide = 'all';
  subscription: Subscription;
  currentPage = 1;
  lastPage = 4;
  fetching = true;
  fetchedCharactersForPages;
  pages = [1, 2, 3, 4];


  constructor(activatedRoute: ActivatedRoute, swService: StarWarsService) {
    this.activatedRoute = activatedRoute;
    this.swService = swService;
   }

  ngOnInit() {
    // this.swService.charactersFetchedForPages.subscribe(
    //   () => this.fillPages()
    // );
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
        this.fetching = true;
        this.characters = this.swService.getCharacters(this.loadedSide);
        this.fetching = false;        
        // this.fillPages();
    
      }
    );
  }
  ngAfterViewInit() {
    
  }

  paginate(change) {
    if (change === 1 && this.currentPage !== this.lastPage) {
      this.currentPage += change;
      this.swService.fetchCharacters(this.currentPage);
    } else if (change === -1 && this.currentPage !== 1) {
      this.currentPage += change;
      this.swService.fetchCharacters(this.currentPage);
    }
    // this.pages.findIndex((page) => {
    //   if (page === this.currentPage) {
    //     return true;
    //   }
    // });
  }

  // fillPages() {
  //   this.fetchedCharactersForPages = this.swService.fillPages();
  //   console.log('fetchedCharactersForPages', this.fetchedCharactersForPages);
    
  //   let numberOfPages = this.fetchedCharactersForPages.length / 10;
  //   let pushPages = 1;
  //   while (pushPages <= numberOfPages) {
  //     this.pages.push(pushPages);
  //   }
  //   console.log(this.pages);
    
  // }

  // we introduced a bug into our code where we were getting wonky behavior due to this
  // ngDestroy. To prevent this we moved a line of code into the app component.
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
