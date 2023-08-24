import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { NumberConverterComponent } from './number-converter/number-converter.component';
import { NumberFormatsPipe } from './customPipe/number-formats.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NumberConverterComponent,
    NumberFormatsPipe 
  ],
  imports: [
    BrowserModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
