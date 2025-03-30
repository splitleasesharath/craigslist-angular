import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.scss']
})
export class ListingViewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ListingViewComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
