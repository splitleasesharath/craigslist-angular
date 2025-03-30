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
  selected: any[] = [];
  // Expose the SelectionType enum to use in the template
  SelectionType = SelectionType;

  constructor(private dataService: DataService,private router: Router,
       public dialog: MatDialog) {}

  ngOnInit(): void {
    this.fetchListing();
  }

  fetchListing(): void {
    this.dataService.get<any>('http://localhost:3000/listings').subscribe({
      next: data => {
        // Assuming data.response.results contains the array
        this.rows = data?.response?.results || [];
      },
      error: error => {
        console.error('Error fetching listings:', error);
      }
    });
  }

  onSelect(event: any): void {
    console.log('Selection changed:', event);
    // The selected array is automatically updated via [selected] binding
  }
  
  onAction(): void {
    console.log('Performing action on selected rows:', this.selected);
    this.openDialog()
    // Implement your action logic here
  }

  isSelected(row: any): boolean {
    return this.selected.indexOf(row) !== -1;
  }

  toggleSelect(row: any, event: any): void {
    if (event.target.checked) {
      // Add row if not already present
      if (!this.isSelected(row)) {
        this.selected.push(row);
      }
    } else {
      const index = this.selected.indexOf(row);
      if (index !== -1) {
        this.selected.splice(index, 1);
      }
    }
    console.log('Current selection:', this.selected);
  }

  allSelected(): boolean {
    return this.rows.length > 0 && this.selected.length === this.rows.length;
  }

  toggleSelectAll(event: any): void {
    if (event.target.checked) {
      // Select all rows
      this.selected = [...this.rows];
    } else {
      // Clear selection
      this.selected = [];
    }
    console.log('Select all toggled. Current selection:', this.selected);
  }
  
  openDialog(): void {

    console.log(this.selected)
    this.dialog.open(ListingViewComponent, {
      width: '80vw',
      data: { name: 'Your Name' },
      panelClass: 'no-padding-dialog'
    });
  }
}
