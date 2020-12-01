import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CardDetails } from '../store/models/card-details.model';
import { AppState } from '../store/models/app-state.model';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  styleUrls: ['./all-cards.component.scss']
})
export class AllCardsComponent implements OnInit {
  public cardDetails: CardDetails[]
  dataSource: any;
  displayedColumns: string[] = ['number', 'name', 'expiry', "ccv", "amount"];
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit() {
    this.loadCardDetails()
  }

  loadCardForm() {
    this.router.navigate(['/card']);
  }

  loadCardDetails() {
    // getting data from the store to show in table
    const subscription = this.store.select(state => state).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.card);
    });
    subscription.unsubscribe();
  }
}
