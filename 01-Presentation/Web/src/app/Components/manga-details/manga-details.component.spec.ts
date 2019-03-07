import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaDetailsComponent } from './manga-details.component';

describe('MangaDetailsComponent', () => {
  let component: MangaDetailsComponent;
  let fixture: ComponentFixture<MangaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
