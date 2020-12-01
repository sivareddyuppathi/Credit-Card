import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { CardReducer } from './store/reducers/card.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AppRoutingModule } from './app-routing.module';
import {
  MatDatepickerModule, MatIconModule, MatMenuModule, MatSidenavModule, MatToolbarModule, MatButtonModule, MatInputModule, MatNativeDateModule, MatCardModule,
  MatFormFieldModule, MatGridListModule
} from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllCardsComponent } from './all-cards/all-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDetailsComponent,
    AllCardsComponent,
  ],
  imports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTableModule,
    StoreModule.forRoot({
      card: CardReducer
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
