import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocButton } from './upload-doc-button';

describe('UploadDocButton', () => {
  let component: UploadDocButton;
  let fixture: ComponentFixture<UploadDocButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadDocButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadDocButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
