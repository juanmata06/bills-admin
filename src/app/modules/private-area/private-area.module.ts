//* Angular modules:
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//* My imports:
import { SharedModule } from '../../shared/shared.module';
import { privateAreaRoutes } from './private-area.routing';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';
import { PrivateAreaComponent } from './private-area.component';


@NgModule({
  declarations: [
    PrivateAreaComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(privateAreaRoutes),
    SharedModule
  ]
})
export class PrivateAreaModule { }
