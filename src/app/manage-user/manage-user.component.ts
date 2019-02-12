import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from '../interface/user-info';
import { UserService } from '../providers/user.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UserRegisterDialogComponent } from '../user-register-dialog/user-register-dialog.component';
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  userList;
  displayedColumns: string[];
  selection: SelectionModel<Observable<UserInfo[]>>;
  constructor(private userService: UserService, public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(data => {
      this.userList = new MatTableDataSource<UserInfo>(data);
    });
    this.selection = new SelectionModel<Observable<UserInfo[]>>(false, []);
    this.displayedColumns = ['select', 'name', 'email'];
  }
  onClickRegister() {
    const dialogRef = this.dialog.open(UserRegisterDialogComponent, {
      height: '400px',
      width: '400px',
      disableClose: true
    });
  }
}
