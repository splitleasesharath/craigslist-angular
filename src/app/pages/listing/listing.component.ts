// src/app/listing/listing.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  dataWithRowDetail: any[] = [];
  optionsWithRowDetail: any;
  columnsWithRowDetail: any[];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Configure any ngx-datatable options if needed.
    this.optionsWithRowDetail = {
      // Example options: rowHeight: 50, headerHeight: 50, etc.
    };

    // Define columns mapping to your listing object's properties.
    this.columnsWithRowDetail = [
      { prop: 'Name', name: 'Name' },
      { prop: 'Features - Qty Guests', name: 'Guests' },
      { prop: 'Features - Qty Bedrooms', name: 'Bedrooms' },
      { prop: 'Features - Qty Beds', name: 'Beds' },
      { prop: 'Features - Qty Bathrooms', name: 'Bathrooms' },
      { prop: 'Location - State', name: 'State' },
      { prop: '💰Damage Deposit', name: 'Damage Deposit' },
      { prop: '💰Cleaning Cost / Maintenance Fee', name: 'Cleaning Fee' },
      { prop: 'rental type', name: 'Rental Type' }
    ];

    // Fetch listings from your API.
    this.fetchListings();
  }

  fetchListings(): void {
    // Adjust the URL to your NestJS endpoint that returns listings.
    this.dataService.get<any>('http://localhost:3000/listings').subscribe({
      next: (data) => {
        // In this example, we assume the API returns an array of listings.
        // If your API returns an object with a property (like response.results), adjust accordingly.
        this.dataWithRowDetail = Array.isArray(data) ? data : data.response?.results || [];
      },
      error: (error) => {
        console.error('Error fetching listings:', error);
      }
    });
  }

  onCheckboxClick(event: any): void {
    console.log('Checkbox clicked:', event);
  }
}
