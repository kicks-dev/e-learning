import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { OrganizationService } from '../../providers/organization.service';

@Component({
  selector: 'app-manage-organization',
  templateUrl: './manage-organization.component.html',
  styleUrls: ['./manage-organization.component.css']
})
export class ManageOrganizationComponent implements OnInit {

  constructor(
    private router: Router,
    private organizationService: OrganizationService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    console.log('manage-organization ngOnInit');
  }
  onClickRegister = () => {
    console.log('manage-organization onclick register');
  }
  onClickEdit = () => {

  }
  onDeleteChecked = (event, id) => {

  }
}
