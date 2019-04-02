import { Component, OnInit } from '@angular/core';
import { StatService } from '../../providers/stat.service';
import { UserStat } from '../../interface/user-info';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
/**
 * 統計情報コンポーネント
 */
@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  view = [1000, 500];
  scheme = 'natural';
  // userStats: Observable<UserStat[]>;
  userStats: UserStat[];
  constructor(private statService: StatService) { }

  ngOnInit() {
    this.statService.setStatObservable(this.update);
    this.statService.getTotalFinishedCoursesByUser().subscribe(users => {
      this.userStats = users;
    });
  }
  update = () => {
    console.log('update');
    this.userStats = [...this.userStats];
  }

}
