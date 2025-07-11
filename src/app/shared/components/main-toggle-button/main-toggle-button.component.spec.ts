import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainToggleButtonComponent } from './main-toggle-button.component';

describe('MainToggleButtonComponent', () => {
  let component: MainToggleButtonComponent;
  let fixture: ComponentFixture<MainToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainToggleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
