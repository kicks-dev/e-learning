import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegisterSnackComponent } from './user-register-snack.component';

describe('UserRegisterSnackComponent', () => {
  let component: UserRegisterSnackComponent;
  let fixture: ComponentFixture<UserRegisterSnackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegisterSnackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegisterSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
