import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardDetails } from '../store/models/card-details.model';

@Injectable({
  providedIn: 'root'
})
export class CardDetailsService {

  constructor(private http: HttpClient) { }

  private _cardDetailsURL = "http://localhost:3000/card-details"


  getCardDeatilsItems() {
    return this.http.get<Array<CardDetails>>(this._cardDetailsURL)
      .pipe()
  }

  addCardDeatils(cardDeatilsItem: CardDetails) {
    return this.http.post(this._cardDetailsURL, cardDeatilsItem)
      .pipe()
  }
}
