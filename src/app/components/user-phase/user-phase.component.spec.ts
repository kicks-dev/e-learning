import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhaseComponent } from './user-phase.component';

describe('UserPhaseComponent', () => {
  let component: UserPhaseComponent;
  let fixture: ComponentFixture<UserPhaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
