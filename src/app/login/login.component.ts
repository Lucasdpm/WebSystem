import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  //formGroup : FormGroup

  constructor (private formBuilder : FormBuilder) {
    //this.formGroup = formBuilder.control()
  }

}
