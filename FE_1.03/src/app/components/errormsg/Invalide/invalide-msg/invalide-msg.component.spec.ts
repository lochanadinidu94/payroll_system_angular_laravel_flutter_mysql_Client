import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalideMsgComponent } from './invalide-msg.component';

describe('InvalideMsgComponent', () => {
  let component: InvalideMsgComponent;
  let fixture: ComponentFixture<InvalideMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvalideMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvalideMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
