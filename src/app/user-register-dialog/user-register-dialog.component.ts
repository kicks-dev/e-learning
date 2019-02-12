import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import { PasswordConfirmValidator } from './password-confirm-validator';
import { AuthService } from '../providers/auth.service';

@Component({
  selector: 'app-user-register-dialog',
  templateUrl: './user-register-dialog.component.html',
  styleUrls: ['./user-register-dialog.component.css']
})
export class UserRegisterDialogComponent implements OnInit {
  registerForm: FormGroup;
  email: FormControl;
  name: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  admin: FormControl;
  constructor(private authService: AuthService ) {
    this.registerForm = new FormGroup({}, PasswordConfirmValidator.MatchPassword);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', [Validators.required]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(6)]);
    this.admin = new FormControl(false);
    this.registerForm.addControl('email', this.email);
    this.registerForm.addControl('name', this.name);
    this.registerForm.addControl('password', this.password);
    this.registerForm.addControl('confirmPassword', this.confirmPassword);
    this.registerForm.addControl('admin', this.admin);
  }

  ngOnInit() {
  }
  onSubmit = () => {
    console.log('onSubmit');
    this.authService.createUser(this.email.value, this.password.value).subscribe(
      result => {
        console.log('result = ' + result);
        const uid = result.user.uid;
        const email = result.user.email;
      },
      error => {

      }
    );
  }

}
