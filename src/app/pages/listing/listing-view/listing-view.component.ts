import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { SpinnerService } from 'src/shared/services/spinner.service';
import { NotificationService } from 'src/shared/services/toastr.service';

@Component({
  selector: 'app-listing-view',
  templateUrl: './listing-view.component.html',
  styleUrls: ['./listing-view.component.scss']
})
export class ListingViewComponent implements OnInit {

  listingForm: FormGroup;
  showForm: boolean = false;
  minDate!: string;
  listingId: string = '';

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

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private notificationService: NotificationService,
    private spinnerService: SpinnerService,
    public dialogRef: MatDialogRef<ListingViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

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
        lat: this.data.selectedRow.lat,
        lon: this.data.selectedRow.lon,
        pricingId: this.data.selectedRow.pricingId,
        // Optionally patch uniqueId if available in selectedRow:
    
      });
      // Set the listing id used for photos API.
      this.listingId = this.data.selectedRow.id;
      console.log('listing id==>', this.listingId);
    }

    this.fetchPhotos()
    this.fetchPricingList()
    this.fetchReverseGeocode()
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  initForm(): void {
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
      // Add controls for reverse geocode and pricing list:
      lat: [''],
      lon: [''],
      pricingId: [''],
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

  /**
   * Call the photos API using listingId.
   */
  fetchPhotos(): void {
    const payload = { listingId: this.listingId };
    this.dataService.post<any>('http://localhost:3000/listings/photos', payload)
      .subscribe(
        response => {
          console.log('Photos response: ', response);
          // Handle photos response (e.g., update UI)
        },
        error => {
          console.error('Photos error: ', error);
          this.notificationService.showError('Failed to fetch photos.');
        }
      );
  }


  fetchPricingList(): void {

    const pricingId = this.listingForm.value.pricingId;
    const payload = { uniqueId:pricingId };
    this.dataService.post<any>('http://localhost:3000/listings/pricing-list', payload)
      .subscribe(
        response => {
          console.log('Pricing list response: ', response);
          // Handle pricing list response (e.g., update UI)
        },
        error => {
          console.error('Pricing list error: ', error);
          this.notificationService.showError('Failed to fetch pricing list.');
        }
      );
  }

  /**
   * Call the reverse geocode API using lat and lon from the form.
   */
  fetchReverseGeocode(): void {
    const lat = this.listingForm.value.lat;
    const lon = this.listingForm.value.lon;

    if (!lat || !lon) {
      this.notificationService.showError('Latitude and Longitude are required for reverse geocoding.');
      return;
    }

    const url = `http://localhost:3000/utility/reverse?lat=${lat}&lon=${lon}`;
    this.dataService.get<any>(url)
      .subscribe(
        response => {
          console.log('Reverse geocode response: ', response);
          // Handle reverse geocode response (e.g., patch location fields)
          // For example, you might update city or street based on the response:
          if (response && response.address) {
            this.listingForm.patchValue({
              city: response.address.city || '',
              street: response.address.road || ''
            });
          }
        },
        error => {
          console.error('Reverse geocode error: ', error);
          this.notificationService.showError('Failed to fetch reverse geocode data.');
        }
      );
  }
}
