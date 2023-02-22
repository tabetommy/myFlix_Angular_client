import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesWithoutAuthComponent } from './movies-without-auth.component';

describe('MoviesWithoutAuthComponent', () => {
  let component: MoviesWithoutAuthComponent;
  let fixture: ComponentFixture<MoviesWithoutAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviesWithoutAuthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesWithoutAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
