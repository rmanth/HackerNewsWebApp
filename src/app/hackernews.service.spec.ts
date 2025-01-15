import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NewsService } from './news.service';
import { HttpClientModule } from '@angular/common/http';
import { BookDetails } from './bookDetails.model';

describe('HackerNewsService', () => {
  let service: NewsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  // Import the HttpClientTestingModule
      providers: [NewsService],    // Provide the service
    });

    service = TestBed.inject(NewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();  // Ensures no HTTP requests are outstanding after the test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch new stories', () => {
    let dummyStoryDetails = [
      { id: 1, title: 'Story 1', author: 'Author 1', type: 'story', url: 'http://story1.com' },
      { id: 2, title: 'Story 2', author: 'Author 2', type: 'story', url: 'http://story2.com' },
      { id: 3, title: 'Story 3', author: 'Author 3', type: 'story', url: 'http://story3.com' },
    ];
    service.getNewestStories().subscribe((books) => {
      expect(books).toEqual(dummyStoryDetails);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${'https://localhost:44384/api/HackerNews'}/newest`,
    });
  
    req.flush(dummyStoryDetails); // Respond with the dummy data
  });

  it('should retrieve stories with pagination', () => {
    let mockResponse = 
      [{ id: 1, title: 'Story 1', author: 'Author 1', type: 'story', url: 'http://story1.com' },
      { id: 2, title: 'Story 2', author: 'Author 2', type: 'story', url: 'http://story2.com' } ]
    
  
    const page = 1;
    const pageSize = 2;
  
    service.getNewestStoriesWithPagination(page, pageSize).subscribe((data:any) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${'https://localhost:44384/api/HackerNews'}/pagination?page=1&pageSize=2`,
    });
  
    req.flush(mockResponse); // Respond with the dummy data
  });
});
