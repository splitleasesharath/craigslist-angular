import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { SpinnerService } from 'src/shared/services/spinner.service';
import { NotificationService } from 'src/shared/services/toastr.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.scss']
})
export class ListingViewComponent implements OnInit {

  listingForm: FormGroup;
  showForm: boolean = false;
  minDate!: string;
  listingId : string = '';

  laundryOptions: string[] = [
    'w/d in unit',
    'w/d hookups',
    'laundry in bldg',
    'laundry on site',
    'no laundry on site'
  ];

  parkingOptions: string[] = [
    'carport',
    'attached garage',
    'detached garage',
    'off-street parking',
    'street parking',
    'valet parking',
    'no parking'
  ];

  // New category dropdown options.
  categoryOptions: string[] = [
    'rooms & shares',
    'sublets & temporary',
    'vacation rentals'
  ];

  aptTypeOptions: string[] = [
    'apartment',
    'condo',
    'cottage/cabin',
    'duplex',
    'flat',
    'house',
    'in-law',
    'loft',
    'townhouse',
    'manufactured',
    'assisted living',
    'land'
  ];

  constructor(private fb: FormBuilder, private dataService: DataService, private notificationService: NotificationService,
     private spinnerService: SpinnerService, public dialogRef: MatDialogRef<ListingViewComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
      this.minDate = this.getCurrentDateTimeLocal();

      this.initForm();

      // Patch the form with the selected row data if available.
      if (this.data && this.data.selectedRow) {
        this.listingForm.patchValue({
          title: this.data.selectedRow.title,
          description: this.data.selectedRow.description,
          email: this.data.selectedRow.email,
          zipcode: this.data.selectedRow.zipcode,
          state: this.data.selectedRow.state,
          bedrooms: this.data.selectedRow.bedrooms,
          bathrooms: this.data.selectedRow.bathrooms,
          sqft: this.data.selectedRow.sqft,
          price: this.data.selectedRow.price,
          rentalType: this.data.selectedRow.rentalType,
          
        });

        this.listingId =  this.data.selectedRow.id

        console.log('listing id==>',  this.listingId)
      }
  
      // Initialize the form with default values and validators for required fields.
      
    }
  closeDialog(): void {
    this.dialogRef.close();
  }

  initForm(){
    this.listingForm = this.fb.group({
      email: ['fhallock44@gmail.com'],
      password: ['eCom2021!'],
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: [''],
      borough: [''],
      zipcode: ['', Validators.required],
      category: [''],
      location: [''],
      sqft: [''],
      rent: [''],
      rent_period: [''],
      apt_type: [''],
      bedrooms: [''],
      bathrooms: [''],
      amenity_laundry: [''],
      amenity_parking: [''],
      laundry: ['', Validators.required],
      parking: ['', Validators.required],
      pets_cat: [false],
      pets_dog: [false],
      is_furnished: [false],
      no_smoking: [false],
      wheelchaccess: [false],
      airconditioning: [false],
      ev_charging: [false],
      available_on: [''],
      street: [''],
      city: [''],
      private_room: [false, Validators.required],
      private_bath: [false, Validators.required],
      useCopyPaste: [false],
      useMixedDescription: [false],
      dateTime: [''],
      amenities: this.fb.array([])
    });
  }

  getCurrentDateTimeLocal(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = ('0' + (now.getMonth() + 1)).slice(-2);
    const day = ('0' + now.getDate()).slice(-2);
    const hours = ('0' + now.getHours()).slice(-2);
    const minutes = ('0' + now.getMinutes()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


}
