//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//* Angular Material modules:
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';

//* My imports:
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    MatTooltipModule,
    TranslatePipe,
  ],
  exports: [
    MatTableModule,
    MatTooltipModule,
    TranslatePipe,
  ]
})
export class SharedModule { }