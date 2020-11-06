import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredmsgComponent } from './requiredmsg.component';

describe('RequiredmsgComponent', () => {
  let component: RequiredmsgComponent;
  let fixture: ComponentFixture<RequiredmsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequiredmsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequiredmsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
