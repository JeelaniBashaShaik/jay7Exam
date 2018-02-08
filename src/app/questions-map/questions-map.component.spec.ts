import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsMapComponent } from './questions-map.component';

describe('QuestionsMapComponent', () => {
  let component: QuestionsMapComponent;
  let fixture: ComponentFixture<QuestionsMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
