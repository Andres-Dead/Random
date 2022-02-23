import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVacantComponent } from './edit-vacant.component';

describe('EditVacantComponent', () => {
  let component: EditVacantComponent;
  let fixture: ComponentFixture<EditVacantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVacantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
