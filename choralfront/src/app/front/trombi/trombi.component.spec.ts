/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TrombiComponent } from './trombi.component';

describe('TrombiComponent', () => {
  let component: TrombiComponent;
  let fixture: ComponentFixture<TrombiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrombiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrombiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
