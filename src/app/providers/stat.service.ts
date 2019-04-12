import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, mergeMap, concatMap, take } from 'rxjs/operators';
import { PhaseInfo } from '../interface/phase-info';
import { UserStat, Series } from '../interface/user-info';
import { CourseInfo } from '../interface/course-info';
import { UserService } from './user.service';
import { Subject } from 'rxjs';
import { CourseService } from './course.service';
@Injectable({
  providedIn: 'root'
})
export class StatService {
  statSubject;
  statObservable;
  constructor(private afs: AngularFirestore) {
    this.statSubject = new Subject();
    this.statObservable = this.statSubject.asObservable();
  }
  setStatObservable = (observer) => {
    return this.statObservable.subscribe({next: () => observer()});
  }
  /**
   * ユーザごとの完了コースとフェーズ数
   */
  getTotalFinishedCoursesByUser = () => {
    return this.afs.collection<UserStat>('users', ref => ref.where('deleted', '==', false)).valueChanges().pipe(
      map(users => users.map(user => {
        user.series = [];
        this.afs.collection<CourseInfo>('courses').valueChanges().pipe(take(1)).pipe(
          map(courses => courses.map( course => {
            console.log('user = ' + user.name + ' course id = ' + course.id);
            user.series.push({name: course.id, value: 0});
            this.afs.collection<PhaseInfo>('attendedPhases/' + user.uid + '/phases').valueChanges().pipe(take(1)).pipe(
              map(phases => phases.map( phase => {
                console.log(' attended user = ' + user.name + ' course id = ' + course.id + ' attended courseId = ' + phase.courseId);
                if (!phase.courseId) {
                  console.log('no courseId!!!');
                  return;
                }
                if (phase.courseId !== course.id) {
                  return;
                }
                user.series.find( obj => obj.name === phase.courseId).value ++;
              }))
            ).subscribe(
              phases => {
                this.statSubject.next();
                console.log('update !!!!');
              }
            );
          }))
        ).subscribe(courses => {
          // this.statSubject.next();
        });
        return user;
      }))
    );
  }
}
