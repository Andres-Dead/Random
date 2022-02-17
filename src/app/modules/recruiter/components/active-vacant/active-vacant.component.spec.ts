import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveVacantComponent } from './active-vacant.component';

describe('ActiveVacantComponent', () => {
  let component: ActiveVacantComponent;
  let fixture: ComponentFixture<ActiveVacantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveVacantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
