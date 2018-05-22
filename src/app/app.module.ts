import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
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
  MatMenu,
  MatMenuModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatDialogModule} from '@angular/material';
import { MainComponent } from './main/main.component';
import { AuthService } from './providers/auth.service';
import { CourseService } from './providers/course.service';
import { PdfService } from './providers/pdf.service';
import { FileService } from './providers/file.service';
import { PhaseComponent } from './phase/phase.component';
import { StudyComponent } from './study/study.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

const appRoutes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'phase/:courseId', component: PhaseComponent },
  { path: 'study/:phaseId', component: StudyComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PhaseComponent,
    StudyComponent,
    UploadDialogComponent
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
    MatTooltipModule,
    MatListModule,
    MatRadioModule,
    MatMenuModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  entryComponents: [UploadDialogComponent],
  providers: [AuthService, CourseService, PdfService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
