import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFieldComponent } from './icon-field.component';

describe('IconFieldComponent', () => {
  let component: IconFieldComponent;
  let fixture: ComponentFixture<IconFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconFieldComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
