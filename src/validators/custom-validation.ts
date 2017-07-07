import { FormControl } from '@angular/forms';

export class CustomValidators {

    

    static password(control: FormControl): { [s: string]: boolean } {

        var PASSWORD_REGEXP =  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

        if (control.value && control.value !== '' && (control.value.length >= 6 && !PASSWORD_REGEXP.test(control.value))) {
            return { invalid : true };
        }
    }

    

    
    
}
