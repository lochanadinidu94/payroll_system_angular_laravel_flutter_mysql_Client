import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatesuccessfullymsgComponent } from './updatesuccessfullymsg.component';

describe('UpdatesuccessfullymsgComponent', () => {
  let component: UpdatesuccessfullymsgComponent;
  let fixture: ComponentFixture<UpdatesuccessfullymsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatesuccessfullymsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatesuccessfullymsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
