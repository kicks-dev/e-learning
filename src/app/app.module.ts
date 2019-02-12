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
import { LoginComponent } from './login/login.component';
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
  MatDialogModule} from '@angular/material';
import { MainComponent } from './main/main.component';
import { PhaseComponent } from './phase/phase.component';
import { StudyComponent } from './study/study.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phase/:courseId', component: PhaseComponent },
  { path: 'study/:phaseId', component: StudyComponent },
  { path: 'manage-user', component: ManageUserComponent}
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
    UserRegisterDialogComponent
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
  ],
  entryComponents: [UploadDialogComponent, UserRegisterDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
