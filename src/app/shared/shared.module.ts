//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule
  ],
  exports: [
    MatTableModule,
    MatTooltipModule,
    TranslatePipe,
    ReactiveFormsModule
  ]
})
export class SharedModule { }