import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AppState } from '../store/models/app-state.model';
import { CardDetails } from '../store/models/card-details.model';
import { AddCardAction } from '../store/actions/card.actions';
import { CardDetailsService } from '../services/credit-card-details.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { getMatIconFailedToSanitizeLiteralError } from '@angular/material';
import { forbiddenExipiryDateValidaor } from '../shared/card-expirydate.validator';


@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnInit {
  shoppingItems: Observable<Array<CardDetails>>;
  isExpDateValid: boolean = true;
  monthValid: boolean = false;
  validLen: boolean = false;
  allFieldsValid: boolean = false;

  private _source = new BehaviorSubject<any>(null);
  public source = this._source.asObservable();

  horizontalPosition: MatSnackBarHorizontalPosition = 'left';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  public cardForm: FormGroup;
  constructor(private fb: FormBuilder,
    private cardService: CardDetailsService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.reactiveForm()
  }

  reactiveForm() {
    this.cardForm = this.fb.group({
      number: ['', [Validators.required, Validators.minLength(19)]],
      name: ['', [Validators.required]],
      expiry: ['', [Validators.required, Validators.minLength(5), forbiddenExipiryDateValidaor(/^(0[1-9]|1[0-2])$/)]],
      ccv: ['', [Validators.maxLength(3), Validators.pattern('^[0-9]+$')]],
      amount: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]]
    })
  }
  get cardFormControls() {
    return this.cardForm.controls;
  }

  get creditCardNumber() {
    return this.cardForm.get('number');
  }
  get creditCardCVV() {
    return this.cardForm.get('ccv');
  }
  get cardHolderName() {
    return this.cardForm.get('name');
  }
  get cardAmount() {
    return this.cardForm.get('amount');
  }
  get cardExpiration() {
    return this.cardForm.get('expiry');
  }

  formatCardNumber(e: any) {
    let cardnum = e.target.value;
    const canrnumlen = cardnum.length;

    if (this.omitAllChars(e)) {
      if (canrnumlen > 18) {
        e.preventDefault();
        return false;
      }
      let parts = cardnum.replace(/[^0-9]/g, "").replace(/\W/gi, '').replace(/(.{4})/g, '$1 ');
      if (e.keyCode !== 8)
        this.cardForm.controls.number.setValue(parts);
    }
  }

  createCard() {
    if (this.cardForm.invalid)
      return false;

    let isValid: boolean;
    //subscribing ngrx store to get the data..
    const subscription = this.store.select(state => state).subscribe(data => {
      isValid = this.isCardExist(data) === true ? false : true;
    });
    if (isValid) {
      this.tosterMessage("Saved Successfully...");
      subscription.unsubscribe();
      // Adding data to the store
      this.store.dispatch(new AddCardAction(this.cardForm.value));
      this.router.navigate(['']);
    } else {
      this.tosterMessage("Card Number Alreay Exists");
    }
  }

  appendForwardSlashToExpDate(e: any) {
    if (this.omitAllChars(e)) {
      const inputVal = e.target.value;
      const inputLength = e.target.value.length;
      if (inputLength > 4) {
        e.preventDefault();
        return false;
      }
      if (inputLength === 2 && e.keyCode !== 8) {
        let thisVal = inputVal;
        thisVal += '/';
        this.cardForm.controls.expiry.setValue(thisVal);
      }
    }
  }

  omitAllChars(e: any) {
    if (/^[0-9]*$/.test(e.key)) {
      return true;
    } else {
      e.preventDefault();
      return false;
    }
  }

  tosterMessage(message: string) {
    this._snackBar.open(message, "X", {
      duration: 2000,
      panelClass: ['red-snackbar'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  isCardExist(data: any) {
    const cardNum = this.cardForm.get('number').value;
    for (let i = 0; i < data.card.length; i++) {
      let a = data.card[i];
      if (a['number'] === cardNum) {
        return true;
      }
    }
    return false;
  }

}
