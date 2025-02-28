import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MockupComponent } from './components/mockup/mockup.component';
import { MockupsListComponent } from './components/mockups-list/mockups-list.component';
import { MockupsCardComponent } from './components/mockups-card/mockups-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MockupComponent,
    MockupsListComponent,
    MockupsCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
