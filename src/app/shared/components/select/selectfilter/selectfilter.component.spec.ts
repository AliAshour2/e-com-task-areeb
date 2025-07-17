import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectfilterComponent } from './selectfilter.component';

describe('SelectfilterComponent', () => {
  let component: SelectfilterComponent;
  let fixture: ComponentFixture<SelectfilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectfilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectfilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
