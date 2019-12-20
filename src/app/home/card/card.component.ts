import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BroadcasterService } from '@app/shared/services/broadcaster.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public favoriteFood$: Observable<string>;
  public isLoading = false;
  public btnText: string;

  private showInput = false;

  constructor(private broadcasterService: BroadcasterService) {
    this.favoriteFood$ = this.broadcasterService.on('favoriteFood');

    this.broadcasterService.on('toggleInput').subscribe((showInput: boolean) => {
      this.showInput = showInput;
      this.btnText = showInput ? 'Hide Input' : 'Show Input';
    });
  }

  ngOnInit() {
    this.btnText = 'Show Input';
  }

  public toggleInput() {
    this.broadcasterService.emit<boolean>('toggleInput', !this.showInput);
  }
}
