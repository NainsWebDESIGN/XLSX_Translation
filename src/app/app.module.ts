import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Component
import { AppComponent } from './app.component';

// Service
import { FormateService } from '@service';

// Pipe
// import { xxx } from '@pipe';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [FormateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
