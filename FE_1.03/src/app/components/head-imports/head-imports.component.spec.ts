import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadImportsComponent } from './head-imports.component';

describe('HeadImportsComponent', () => {
  let component: HeadImportsComponent;
  let fixture: ComponentFixture<HeadImportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadImportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadImportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
