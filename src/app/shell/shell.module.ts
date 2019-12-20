import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material.module';

import { ShellComponent } from './shell.component';
import { SideNavContentComponent } from './side-nav-content/side-nav-content.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { TitleComponent } from './side-nav-content/title/title.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ShellComponent, SideNavContentComponent, SideNavComponent, TitleComponent]
})
export class ShellModule {}
