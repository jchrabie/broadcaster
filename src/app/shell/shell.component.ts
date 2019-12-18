import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MediaObserver } from '@angular/flex-layout';
import { Observable, Subject } from 'rxjs';

import { I18nService } from '@app/core';
import { BroadcasterService } from '@app/shared/services/broadcaster.service';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  public showInput$: Observable<boolean>;
  public foodCtrl = new FormControl();
  public filteredFoods: Observable<string[]>;

  private foods: string[] = ['Sushis', 'Pizzas', 'Burgers'];

  constructor(
    private router: Router,
    private media: MediaObserver,
    private i18nService: I18nService,
    private broadcasterService: BroadcasterService,
  ) {
    this.filteredFoods = this.foodCtrl.valueChanges
      .pipe(
        startWith(''),
        map(state => state ? this._filteredFoods(state) : this.foods.slice())
      );

    this.broadcasterService.on('favoriteFood').subscribe(() => this.foodCtrl.setValue(''));
  }

  ngOnInit() {
    this.showInput$ = this.broadcasterService.on('toggleInput');
  }

  public onOptionSelect(event: MatAutocompleteSelectedEvent) {
    this.broadcasterService.emit('favoriteFood', event.option.value);
  }

  public setLanguage(language: string): void {
    this.i18nService.language = language;
  }

  private _filteredFoods(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.foods.filter(food => food.toLowerCase().includes(filterValue));
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isMobile(): boolean {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
}
