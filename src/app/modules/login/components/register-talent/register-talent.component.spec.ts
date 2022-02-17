import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTalentComponent } from './register-talent.component';

describe('RegisterTalentComponent', () => {
  let component: RegisterTalentComponent;
  let fixture: ComponentFixture<RegisterTalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterTalentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterTalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
