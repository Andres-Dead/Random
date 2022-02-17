import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacantsComponent } from './vacants.component';

describe('VacantsComponent', () => {
  let component: VacantsComponent;
  let fixture: ComponentFixture<VacantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
