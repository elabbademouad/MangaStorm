import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MangaItemComponent } from './manga-item.component';

describe('MangaItemComponent', () => {
  let component: MangaItemComponent;
  let fixture: ComponentFixture<MangaItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MangaItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MangaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
