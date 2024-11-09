import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentConsoleComponent } from './agent-console.component';

describe('AgentConsoleComponent', () => {
  let component: AgentConsoleComponent;
  let fixture: ComponentFixture<AgentConsoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentConsoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
