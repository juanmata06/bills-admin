//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//* Angular Material modules:
import { MatTableModule } from '@angular/material/table';

//* My imports:
import { TranslatePipe } from './pipes/translate.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTableModule,
    TranslatePipe,
  ],
  exports: [
    MatTableModule,
    TranslatePipe,
  ]
})
export class SharedModule { }