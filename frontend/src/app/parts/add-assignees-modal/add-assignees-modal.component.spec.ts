import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddAssigneesModalComponent} from './add-assignees-modal.component';

describe('AddAssigneesModalComponent', () => {
  let component: AddAssigneesModalComponent;
  let fixture: ComponentFixture<AddAssigneesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAssigneesModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAssigneesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
