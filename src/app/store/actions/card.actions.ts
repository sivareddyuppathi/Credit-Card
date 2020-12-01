import { Action } from '@ngrx/store';
import { CardDetails } from '../models/card-details.model';

export enum CardActionTypes {
  ADD_CARD = '[CARD] Add Card'
}

export class AddCardAction implements Action {
  readonly type = CardActionTypes.ADD_CARD
  constructor(public payload: CardDetails) { }
}

export type CardAction = AddCardAction
