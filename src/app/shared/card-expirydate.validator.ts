import { AbstractControl, ValidatorFn } from '@angular/forms';

export function forbiddenExipiryDateValidaor(forbiddenMonth: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const inputval = control.value;
        var forbidden;
        if (inputval.length === 2) {
            forbidden = forbiddenMonth.test(inputval);
            return forbidden ? null : { 'forbidenMonthYear': { value: inputval } };
        }
        if (inputval.length > 5) {
            const monthYear = inputval.split("/");
            const inputMonth = monthYear[0];
            const inputYear = monthYear[1];

            const today = new Date(); // gets the current date
            const today_mm = today.getMonth() + 1; // extracts the month portion
            const today_yy = today.getFullYear() % 100; // extracts the year portion and changes it from yyyy to yy format
            if (inputYear > today_yy || (inputYear == today_yy && inputMonth >= today_mm)) {
                forbidden = true;
            }
            else {
                forbidden = false;
            }
            return forbidden ? { 'forbidenMonthYear': { value: inputval } } : null;
        }
    };
}