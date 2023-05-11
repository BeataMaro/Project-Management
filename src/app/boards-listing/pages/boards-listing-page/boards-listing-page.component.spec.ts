import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardsListingPageComponent } from './boards-listing-page.component';


describe('BoardComponent', () => {
  let component: BoardsListingPageComponent;
  let fixture: ComponentFixture<BoardsListingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsListingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardsListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
