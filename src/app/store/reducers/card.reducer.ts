import { CardActionTypes, AddCardAction } from '../actions/card.actions';
import { CardDetails } from '../models/card-details.model';

const initialState: Array<CardDetails> = [];

export function CardReducer(state: Array<CardDetails> = initialState, action: AddCardAction) {

  switch (action.type) {
    case CardActionTypes.ADD_CARD:
      return [...state, action.payload];
    default:
      return state;
  }

}