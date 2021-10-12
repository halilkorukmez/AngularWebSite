import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutsComponent } from './abouts.component';

describe('AboutsComponent', () => {
  let component: AboutsComponent;
  let fixture: ComponentFixture<AboutsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
