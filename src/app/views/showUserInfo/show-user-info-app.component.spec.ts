import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserInfoAppComponent } from './show-user-info-app.component';

describe('ShowUserInfoAppComponent', () => {
  let component: ShowUserInfoAppComponent;
  let fixture: ComponentFixture<ShowUserInfoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowUserInfoAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowUserInfoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
