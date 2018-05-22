import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/mergeMap';
import { merge } from 'rxjs/operators';

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

  getPhasesByCourseId(courseId: string, uid: string) {
    console.log('getPhasesByCourseId courseId = ' + courseId + ' uid = ' + uid);
    const phaseList = this.afs.collection<PhaseInfo>('phases', ref => ref.where('courseId', '==', courseId))
    .valueChanges();

    return phaseList.map(phases => {
      phases.map(phase => {
        console.log('phase id =' + phase.id);
        this.afs.doc<PhaseInfo>('attendedPhases/' + uid + '/phases/' + phase.id).valueChanges()
        .map(phaseInfo => {
          phase.endDateTime = phaseInfo ? phaseInfo.endDateTime : null;
          phase.startDateTime = phaseInfo ? phaseInfo.startDateTime : null;
          console.log('endTime = ' + phase.endDateTime);
        }).subscribe();
      });
      return phases;
    });
  }
  startPhase(uid: string, phase: PhaseInfo) {
    console.log('startPhase (uid, phaseId) = ' + uid + ' ' + phase.id);
    const phaseRef = this.afs.doc('attendedPhases/' + uid + '/phases/' + phase.id);
    if (!phase.startDateTime) {
      phaseRef.set({startDateTime: new Date()});
    } else {
      phaseRef.update({updateDateTime: new Date()});
    }
  }

  getPhaseById(id: string) {
    return this.afs.doc<PhaseInfo>('phases/' + id).valueChanges();
  }

  completePhase(courseId: string, phaseId: string, uid: string) {
    console.log('completePhase (curseId, phaseId, uid} = ' + courseId + ' ' + phaseId + ' ' + uid);
    this.afs.doc<PhaseInfo>('attendedPhases/' + uid + '/phases/' + phaseId).update({endDateTime: new Date()});
  }
}


