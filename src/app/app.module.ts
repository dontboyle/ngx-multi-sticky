import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgxManyStickyModule } from 'ngx-many-sticky';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxManyStickyModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
