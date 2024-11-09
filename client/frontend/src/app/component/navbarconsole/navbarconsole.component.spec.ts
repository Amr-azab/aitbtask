import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarconsoleComponent } from './navbarconsole.component';

describe('NavbarconsoleComponent', () => {
  let component: NavbarconsoleComponent;
  let fixture: ComponentFixture<NavbarconsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarconsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarconsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
