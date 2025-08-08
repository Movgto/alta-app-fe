import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClients } from './register-clients';

describe('RegisterClients', () => {
  let component: RegisterClients;
  let fixture: ComponentFixture<RegisterClients>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterClients]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterClients);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
