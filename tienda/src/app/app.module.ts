import { CartComponent } from './shared/components/Cart/cart.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/Http';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent, HeaderComponent, CartComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
