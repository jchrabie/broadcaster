import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { BroadcasterService } from '@app/shared/services/broadcaster.service';
import { Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  @Input() sidenav: MatSidenav;

  public showInput$: Observable<boolean>;
  public foodCtrl = new FormControl();

  public foods: string[] = ['Sushis', 'Pizzas', 'Burgers'];

  constructor(private broadcasterService: BroadcasterService) {
    this.broadcasterService.on('favoriteFood').subscribe(food => this.foodCtrl.setValue(food));
  }

  ngOnInit() {
    this.showInput$ = this.broadcasterService.on('toggleInput');
  }

  public onOptionSelect(event: MatSelectChange) {
    this.broadcasterService.emit('favoriteFood', event.value);
  }
}
