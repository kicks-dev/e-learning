import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup} from '@angular/forms';
import { PasswordConfirmValidator } from '../../validators/password-confirm-validator';
import { AuthService } from '../../providers/auth.service';
import { UserService } from '../../providers/user.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserRegisterSnackComponent } from '../../snack-bars/user-register-snack/user-register-snack.component';

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
  registering = false;
  constructor(
    public dialogRef: MatDialogRef<UserRegisterDialogComponent>,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar) {
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
    this.registering = true;
    this.authService.createUser(this.email.value, this.password.value).subscribe(
      result => {
        console.log('result = ' + result);
        const uid = result.user.uid;
        const email = result.user.email;
        this.userService.registerUser(this.name.value, email, uid, this.admin.value).subscribe( res => {
          console.log('res = ' + res);
          this.registering = false;
          this.dialogRef.close();
          this.snackBar.openFromComponent(UserRegisterSnackComponent, {
            duration: 1000,
          });
        });
      },
      error => {

      }
    );
  }
  onClickCancel = () => {
    console.log('onclickcancel');
    this.dialogRef.close();
  }

}
