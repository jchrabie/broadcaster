import { Component, OnInit, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { BroadcasterService } from '@app/shared/services/broadcaster.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  public favoriteFood$: Observable<string>;

  constructor(private titleService: Title, private broadcasterService: BroadcasterService) {}

  ngOnInit() {
    this.favoriteFood$ = this.broadcasterService.on('favoriteFood').pipe(
      map(favoriteFood => {
        switch (favoriteFood) {
          case 'Sushis':
            return '🍣';
          case 'Pizzas':
            return '🍕';
          case 'Burgers':
            return '🍔';
          default:
            return '';
        }
      })
    );
  }

  public removeFood(): void {
    this.broadcasterService.emit('favoriteFood', '');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
