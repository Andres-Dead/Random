import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewVacantComponent } from './new-vacant.component';

describe('NewVacantComponent', () => {
  let component: NewVacantComponent;
  let fixture: ComponentFixture<NewVacantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVacantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVacantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
