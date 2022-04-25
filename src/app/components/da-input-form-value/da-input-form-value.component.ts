import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-da-input-form-value',
  templateUrl: './da-input-form-value.component.html',
  styleUrls: ['./da-input-form-value.component.scss'],
})
export class DaInputFormValueComponent implements OnInit {

  @Input() header: string;
  @Input() validationMessages: {[key: string]: string};
  @Input() fromControlValidation: AbstractControl;

  constructor() { }

  ngOnInit() {

  }

}
