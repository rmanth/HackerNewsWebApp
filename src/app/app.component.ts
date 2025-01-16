import { Component, OnInit } from '@angular/core';
import { BookDetails, HackerNewsService } from './hackernews.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class AppComponent implements OnInit {
  news: BookDetails[] = [];
  query: string = '';
  results: BookDetails[] = [];
  newStories: BookDetails[] = [];
  loading: boolean = false;
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0;
  newStoriesWithPagination: BookDetails[] = [];

  constructor(private newsService: HackerNewsService) {}

  ngOnInit() : void {
      
  }

  loadData()
  {
    this.loadNewStories();
    this.loadNewStoriesWithPagination();  
  }

  loadNewStories() {
    this.loading = true;
    this.newsService.getNewestStories().subscribe(
      (stories) => {
        this.newStories = stories;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  loadNewStoriesWithPagination() {
    this.loading = true;
    this.newsService.getNewestStoriesWithPagination(this.currentPage, this.pageSize).subscribe(
      (stories) => {
        this.newStoriesWithPagination = stories;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Search for stories
  search() {
    this.loading = true;
    this.newsService.search(this.query).subscribe(
      (stories) => {
        this.results = stories;
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
      }
    );
  }

  // Next page
  nextPage() {
    this.currentPage++;
    this.loadNewStories();
  }

  // Previous page
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadNewStories();
    }
  }
}