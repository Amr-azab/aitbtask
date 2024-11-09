import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarverticalComponent } from './navbarvertical.component';

describe('NavbarverticalComponent', () => {
  let component: NavbarverticalComponent;
  let fixture: ComponentFixture<NavbarverticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarverticalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarverticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
