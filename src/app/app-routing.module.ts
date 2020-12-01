import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardDetailsComponent } from './card-details/card-details.component';
import { AllCardsComponent } from './all-cards/all-cards.component';

const routes: Routes = [
  { path: "", component: AllCardsComponent },
  { path: 'card', component: CardDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}    