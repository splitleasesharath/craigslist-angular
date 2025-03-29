// src/app/listing/listing.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  // For the official ngx-datatable, we use "rows" instead of "data"
  rows: any[] = [];
  // Define columns as an array of objects with "name" and "prop"
  columns: Array<{ name: string; prop: string }> = [];
  options: any;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.options = {
      // You can add options like rowHeight, headerHeight, etc.
      headerHeight: 50,
      rowHeight: 50
    };

    this.fetchListings();
  }

  fetchListings(): void {
    // Replace with your NestJS endpoint URL
    this.dataService.get<any>('http://localhost:3000/listings').subscribe({
      next: (data) => {
        // If API returns a single object instead of an array, wrap it in an array.
        const result = Array.isArray(data) ? data : data.response?.results || [data];
        this.rows = result;

        if (this.rows.length > 0) {
          // Dynamically create column definitions from the keys of the first object.
          const firstItem = this.rows[0];
          this.columns = Object.keys(firstItem).map(key => ({
            name: key,
            prop: key
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }
}
