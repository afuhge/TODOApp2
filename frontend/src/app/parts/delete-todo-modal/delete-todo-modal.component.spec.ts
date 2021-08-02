import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTodoModalComponent } from './delete-todo-modal.component';

describe('DeleteTodoModalComponent', () => {
  let component: DeleteTodoModalComponent;
  let fixture: ComponentFixture<DeleteTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTodoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
