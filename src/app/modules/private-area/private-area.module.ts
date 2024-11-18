import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { privateAreaRoutes } from './private-area.routing';
import { MyProfileComponent } from './modules/my-profile/my-profile.component';



@NgModule({
  declarations: [
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(privateAreaRoutes),
    SharedModule
  ]
})
export class PrivateAreaModule { }
