import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Router
import { AppRoutingModule } from './app.routing';

// Component
import { AppComponent } from './app.component';
import { ConvertExcelComponent } from './ConvertExcel/ConvertExcel.component';
import { ConvertJsonComponent } from './ConvertJson/ConvertJson.component';
import { CompareComponent } from './Compare/Compare.component';

// Service
import { FormateService, Observer } from '@service';

// Pipe
// import { xxx } from '@pipe';


@NgModule({
  declarations: [
    AppComponent,
    ConvertExcelComponent,
    ConvertJsonComponent,
    CompareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [FormateService, Observer],
  bootstrap: [AppComponent]
})
export class AppModule { }
