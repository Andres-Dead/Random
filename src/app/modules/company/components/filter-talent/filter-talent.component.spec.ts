import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTalentComponent } from './filter-talent.component';

describe('FilterTalentComponent', () => {
  let component: FilterTalentComponent;
  let fixture: ComponentFixture<FilterTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
