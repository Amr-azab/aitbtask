import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMyTicketsComponent } from './show-my-tickets.component';

describe('ShowMyTicketsComponent', () => {
  let component: ShowMyTicketsComponent;
  let fixture: ComponentFixture<ShowMyTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowMyTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowMyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
