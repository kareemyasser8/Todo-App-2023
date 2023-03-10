import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDayTasksListComponent } from './myDay-list.component';

describe('MyDayTasksListComponent', () => {
  let component: MyDayTasksListComponent;
  let fixture: ComponentFixture<MyDayTasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDayTasksListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDayTasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
