// src/app/listing/listing.component.ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { SelectionType } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ListingViewComponent } from './listing-view/listing-view.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {
  rows: any[] = [];
  mappedRows: any[] = [];
  selected: any[] = [];
  SelectionType = SelectionType;

  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchListing();
  }

  fetchListing(): void {
    this.dataService.get<any>('http://localhost:3000/listings').subscribe({
      next: data => {
        // Assuming data.response.results contains the array
        this.rows = data?.response?.results || [];
        // Map the API response to the sample keys
        this.mappedRows = this.rows.map(row => ({
          title: row["Name"],
          description: row["Description"],
          email: row["host name"],
          zipcode: row["Location - Zip Code"],
          state: row["Location - State"],
          bedrooms: row["Features - Qty Bedrooms"],
          bathrooms: row["Features - Qty Bathrooms"],
          sqft: row["Features - SQFT Area"],
          price: row["💰Price Override"],
          rentalType: row["rental type"]
        }));
      },
      error: error => {
        console.error('Error fetching listings:', error);
      }
    });
  }

  onSelect(event: any): void {
    console.log('Selection changed:', event);
  }
  
  onAction(): void {
    console.log('Performing action on selected rows:', this.selected);
    this.openDialog();
  }
  // isSelected(row: any): boolean {
  //   return this.selected.indexOf(row) !== -1;
  // }

  // toggleSelect(row: any, event: any): void {
  //   if (event.target.checked) {
  //     if (!this.isSelected(row)) {
  //       this.selected.push(row);
  //     }
  //   } else {
  //     const index = this.selected.indexOf(row);
  //     if (index !== -1) {
  //       this.selected.splice(index, 1);
  //     }
  //   }
  //   console.log('Current selection:', this.selected);
  // }

  // allSelected(): boolean {
  //   return this.rows.length > 0 && this.selected.length === this.rows.length;
  // }

  // toggleSelectAll(event: any): void {
  //   if (event.target.checked) {
  //     this.selected = [...this.rows];
  //   } else {
  //     this.selected = [];
  //   }
  //   console.log('Select all toggled. Current selection:', this.selected);
  // }

  isSelected(row: any): boolean {
    return this.selected.length > 0 && this.selected[0] === row;
  }

  // Modified to allow only a single selection.
  toggleSelect(row: any, event: any): void {
    if (event.target.checked) {
      // Clear previous selection and set current row as the only selected row
      this.selected = [row];
    } else {
      this.selected = [];
    }
    console.log('Current selection:', this.selected);
  }

  // Modified header checkbox logic for single selection:
  // When checked, select the first row (if any); when unchecked, clear selection.
  toggleSelectAll(event: any): void {
    if (event.target.checked && this.rows.length > 0) {
      this.selected = [this.rows[0]];
    } else {
      this.selected = [];
    }
    console.log('Select all toggled. Current selection:', this.selected);
  }
  
  openDialog(): void {
    console.log(this.selected);
    this.dialog.open(ListingViewComponent, {
      width: '80vw',
      data: { name: 'Your Name' },
      panelClass: 'no-padding-dialog'
    });
  }
}
