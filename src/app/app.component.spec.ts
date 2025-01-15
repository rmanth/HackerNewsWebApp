import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HackerNewsService } from './hackernews.service';
import { of } from 'rxjs';
import { BookDetails } from './bookDetails.model';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let hackerNewsService: jasmine.SpyObj<HackerNewsService>;

  beforeEach(() => {
    hackerNewsService = jasmine.createSpyObj('HackerNewsService', ['getNewestStories', 'getNewestStoriesWithPagination']);

    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        { provide: HackerNewsService, useValue: hackerNewsService }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;   
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  }); 
});
