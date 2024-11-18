//* Angular modules:
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ReactiveFormsModule } from '@angular/forms';

//* My imports:
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslatePipe } from './shared/pipes/translate.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslatePipe,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    // TranslatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
