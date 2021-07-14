import { NgForm } from '@angular/forms';

export const formValidation = (form: NgForm) => {
  if (form.invalid) {
    return false;
  } else {
    return true;
  }
};
