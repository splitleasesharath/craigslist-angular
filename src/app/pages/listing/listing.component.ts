// src/app/listing/listing.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  // Using "rows" as expected by @swimlane/ngx-datatable
  rows: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchListing();
  }

  fetchListing(): void {
    this.dataService.get<any>('http://localhost:3000/listings').subscribe({
      next: data => {
        // Assign the array from data.response.results to rows
        this.rows = data?.response?.results || [];
        console.log('Fetched listing rows:', this.rows);
      },
      error: error => {
        console.error('Error fetching listing:', error);
      }
    });
  }
  
}
