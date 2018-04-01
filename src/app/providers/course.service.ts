import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';


@Injectable()
export class CourseService {

  constructor(private afs: AngularFirestore) {}

  getCourses() {
    return this.afs.collection<CourseInfo>('courses').snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as CourseInfo;
        const id = a.payload.doc.id;
        return { id, ...data};
      });
    });
  }

  getCourseById(id: string) {
    console.log('getCourseById id = ' + id);
    return this.afs.doc<CourseInfo>('courses/' + id).valueChanges();
  }

  getPhasesByCourseId(courseId: string) {
    return this.afs.collection<PhaseInfo[]>('phases', ref => ref.where('courseId', '==', courseId))
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as PhaseInfo;
        const id = a.payload.doc.id;
        return { id, ...data};
      });
    });
  }

  getPhaseById(id: string) {
    return this.afs.doc<PhaseInfo>('phases/' + id).valueChanges();
  }
}


