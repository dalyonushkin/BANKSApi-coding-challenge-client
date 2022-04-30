import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-da-input-form-value',
  templateUrl: './da-input-form-value.component.html',
  styleUrls: ['./da-input-form-value.component.scss'],
})
export class DaInputFormValueComponent  {

  @Input() header: string;
  @Input() validationMessages: { [key: string]: string };
  @Input() fromControlValidation: AbstractControl;

  constructor() { }


  get isShowError(): boolean {
    return (this.fromControlValidation?.invalid && (this.fromControlValidation?.dirty || this.fromControlValidation?.touched));
  }

}
