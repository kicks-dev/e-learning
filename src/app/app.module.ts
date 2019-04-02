import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { environment } from '../environments/environment';
import { MomentModule } from 'ngx-moment';
import { LoginComponent } from './components/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatDividerModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatTooltipModule,
  MatListModule,
  MatRadioModule,
  MatTableModule,
  MatMenuModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDialogModule,
  MatSnackBarModule} from '@angular/material';
import { MainComponent } from './components/main/main.component';
import { PhaseComponent } from './components/phase/phase.component';
import { StudyComponent } from './components/study/study.component';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { UserRegisterDialogComponent } from './components/user-register-dialog/user-register-dialog.component';
import { UserRegisterSnackComponent } from './snack-bars/user-register-snack/user-register-snack.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { UserPhaseComponent } from './components/user-phase/user-phase.component';
import { StatComponent } from './components/stat/stat.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phase/:courseId', component: PhaseComponent },
  { path: 'study/:phaseId', component: StudyComponent },
  { path: 'manage-user', component: ManageUserComponent},
  { path: 'user-status', component: UserStatusComponent},
  { path: 'user-phase/:courseId', component: UserPhaseComponent},
  { path: 'stat', component: StatComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PhaseComponent,
    StudyComponent,
    UploadDialogComponent,
    ManageUserComponent,
    UserRegisterDialogComponent,
    UserRegisterSnackComponent,
    UserStatusComponent,
    UserPhaseComponent,
    StatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'systemlamp-e-learning'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    PdfViewerModule,
    MomentModule,
    NgbModule,
    MatDividerModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    NgxChartsModule
  ],
  entryComponents: [UploadDialogComponent, UserRegisterDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
