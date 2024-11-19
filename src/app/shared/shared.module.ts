//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//* Angular Material modules:
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

//* My imports:
import { TranslatePipe } from './pipes/translate.pipe';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatTooltipModule,
    TranslatePipe,
    SidebarComponent
  ]
})
export class SharedModule { }