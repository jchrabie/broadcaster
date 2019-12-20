import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '@app/shared/services/broadcaster.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public foods: string[] = [];
  constructor(private broadcasterService: BroadcasterService) {}

  ngOnInit() {
    this.broadcasterService.on('favoriteFood').subscribe((food: string) => this.foods.push(food));
  }
}
