import { FormControl, FormGroup } from '@angular/forms';

export interface ZipCodeForm {
  zipCode: string;
  country: string;
};

export class ZipCodeForm extends FormGroup {
  value: ZipCodeForm;
  controls: Record<keyof ZipCodeForm, FormControl>;

  constructor() {
    super({
      zipCode: new FormControl(null),
      country: new FormControl(null)
    });
  }
}