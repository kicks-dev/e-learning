import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CourseInfo } from '../interface/course-info';
import { PhaseInfo } from '../interface/phase-info';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses$: Observable<CourseInfo[]>;

  constructor(private afs: AngularFirestore) {}

  getCourses(uid: string) {
    this.courses$ = this.afs.collection<CourseInfo>('courses').valueChanges().pipe(map(courses => {
      courses.map(course => {
        this.afs.collection<PhaseInfo>('attendedPhases/' + uid + '/phases', ref => ref.where('courseId', '==', course.id))
        .valueChanges().pipe(map(phaseInfos => {
          course.finishCount = phaseInfos.length;
        })).subscribe();
        this.afs.collection<PhaseInfo>('phases', ref => ref.where('courseId', '==', course.id))
        .valueChanges().pipe(map(phases => {
          course.phaseCount = phases.length;
        } )).subscribe();
      });
      return courses;
    }));
  }

  getCourseById(id: string) {
    console.log('getCourseById id = ' + id);
    return this.afs.doc<CourseInfo>('courses/' + id).valueChanges();
  }

  getPhasesByCourseId(courseId: string, uid: string) {
    console.log('getPhasesByCourseId courseId = ' + courseId + ' uid = ' + uid);
    const phaseList = this.afs.collection<PhaseInfo>('phases', ref => ref.where('courseId', '==', courseId).orderBy('no'))
    .valueChanges();

    return phaseList.pipe(map(phases => {
      phases.map(phase => {
        console.log('phase id =' + phase.id);
        this.afs.doc<PhaseInfo>('attendedPhases/' + uid + '/phases/' + phase.id).valueChanges().pipe(
        map(phaseInfo => {
          phase.endDateTime = phaseInfo ? phaseInfo.endDateTime : null;
          phase.startDateTime = phaseInfo ? phaseInfo.startDateTime : null;
          console.log('endTime = ' + phase.endDateTime);
        })).subscribe();
      });
      return phases;
    }));
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
    this.afs.doc<PhaseInfo>('attendedPhases/' + uid + '/phases/' + phaseId).update({endDateTime: new Date(), courseId: courseId});
  }
}


