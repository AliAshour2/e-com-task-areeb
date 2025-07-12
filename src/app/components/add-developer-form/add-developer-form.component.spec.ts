import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDeveloperFormComponent } from './add-developer-form.component';

describe('AddDeveloperFormComponent', () => {
  let component: AddDeveloperFormComponent;
  let fixture: ComponentFixture<AddDeveloperFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDeveloperFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDeveloperFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
