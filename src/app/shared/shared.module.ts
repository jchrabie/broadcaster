import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { BroadcasterService } from './services/broadcaster.service';

@NgModule({
  imports: [FlexLayoutModule, MaterialModule, CommonModule],
  declarations: [LoaderComponent],
  providers: [BroadcasterService],
  exports: [LoaderComponent]
})
export class SharedModule {}
