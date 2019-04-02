import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../../interface/user-info';
import { UserService } from '../../providers/user.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserRegisterDialogComponent } from '../user-register-dialog/user-register-dialog.component';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userList;
  displayedColumns: string[];
  selection: SelectionModel<UserInfo>;
  constructor(
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog,
    private authService: AuthService) {
    }

  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.userList = new MatTableDataSource<UserInfo>(data);
    });
    this.selection = new SelectionModel<UserInfo>(true, []);
    this.displayedColumns = ['select', 'name', 'email', 'deleted'];
  }
  onClickRegister() {
    const dialogRef = this.dialog.open(UserRegisterDialogComponent, {
      height: '450px',
      width: '400px',
      disableClose: true
    });
  }
  onDeleteChecked = (event, email) => {
    this.userService.deleteUser(event.checked, email);
  }
  onClickShowStatus = () => {
    const selectedUser = this.selection.selected[0];
    console.log('selected user name = ' + selectedUser.name);
    this.router.navigate(['user-status', selectedUser]);
  }
}
