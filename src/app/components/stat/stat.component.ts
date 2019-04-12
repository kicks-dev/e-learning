import { Component, OnInit, OnDestroy } from '@angular/core';
import { StatService } from '../../providers/stat.service';
import { UserStat } from '../../interface/user-info';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable, Subscription } from 'rxjs';
/**
 * 統計情報コンポーネント
 */
@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit, OnDestroy {
  view = [1000, 500];
  scheme = 'natural';
  // userStats: Observable<UserStat[]>;
  userStats: UserStat[];
  statServiceSubscription: Subscription;
  statUpdateSubscription: Subscription;
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statUpdateSubscription = this.statService.setStatObservable(this.update);
    this.statServiceSubscription = this.statService.getTotalFinishedCoursesByUser().subscribe(users => {
      this.userStats = users;
    });
  }
  ngOnDestroy(): void {
    this.statServiceSubscription.unsubscribe();
    this.statUpdateSubscription.unsubscribe();
  }
  update = () => {
    console.log('update');
    this.userStats = [...this.userStats];
  }

}
