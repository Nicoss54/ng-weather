import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ZipCodeForm {
  zipCode: string;
  country: string;
};

export class ZipCodeForm extends FormGroup {
  value: ZipCodeForm;
  controls: Record<keyof ZipCodeForm, FormControl>;

  constructor() {
    super({
      zipCode: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required)
    });
  }
}