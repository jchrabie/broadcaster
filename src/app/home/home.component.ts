import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';

import { BroadcasterService } from '@app/shared/services/broadcaster.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public favoriteFood$: Observable<string>;
  public isLoading = false;
  public btnText: string;
  private showInput = false;

  constructor(private broadcasterService: BroadcasterService) {
    this.favoriteFood$ = this.broadcasterService.on('favoriteFood');
  }

  ngOnInit() {
    this.btnText = 'Show Input';
  }

  public toggleInput() {
    this.showInput = !this.showInput;
    this.btnText = this.showInput ? 'Show Input' : 'Hide Input'
    this.broadcasterService.emit('toggleInput', this.showInput);
  }
}
