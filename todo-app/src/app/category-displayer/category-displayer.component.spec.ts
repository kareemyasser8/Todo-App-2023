import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDisplayerComponent } from './category-displayer.component';

describe('CategoryDisplayerComponent', () => {
  let component: CategoryDisplayerComponent;
  let fixture: ComponentFixture<CategoryDisplayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDisplayerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
