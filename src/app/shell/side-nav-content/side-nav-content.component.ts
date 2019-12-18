import { Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BroadcasterService } from '@app/shared/services/broadcaster.service';

@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss']
})
export class SideNavContentComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public favoriteFood$: Observable<string>;

  constructor(
    private titleService: Title,
    private broadcasterService: BroadcasterService,
  ) { }

  ngOnInit() {
    this.favoriteFood$ = this.broadcasterService.on('favoriteFood')
      .pipe(map(favoriteFood => {
        switch(favoriteFood) {
          case 'Sushis':
            return '🍣';
          case 'Pizzas':
            return '🍕';
          case 'Burgers':
            return '🍔';
          default:
            return ''
        }
      }))
  }

  public removeFood(): void {
    this.broadcasterService.emit('favoriteFood', '');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
