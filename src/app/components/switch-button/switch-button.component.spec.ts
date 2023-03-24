import { configureTestSuite } from 'ng-bullet';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchButtonComponent } from './switch-button.component';

describe('SwitchButtonComponent', () => {
  let component: SwitchButtonComponent;
  let fixture: ComponentFixture<SwitchButtonComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchButtonComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('segmentChanged', () => {
    it('should emit value', () => {
      const value = 'newValue';
      const emitSpy = spyOn(component.selectedSegment, 'emit').and.returnValue(true);
      component.segmentChanged(value);
      expect(emitSpy).toHaveBeenCalledWith(value);
    });
  });
});
