import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listingForm: FormGroup;
  showForm: boolean = false;
  private apiUrl = 'http://localhost:3000/flask/create_craigslist';

  // New dropdown options arrays
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

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    // Initialize the form with default values.
    this.listingForm = this.fb.group({
      email: ['bdouglas0927@gmail.com'],
      password: ['eCom2021!'],
      title: [''],
      description: [''],
      price: [''],
      borough: [''],
      zipcode: [''],
      category: [''], // This will be a dropdown now.
      location: [''],
      sqft: [''],
      rent: [''],
      rent_period: [''],
      apt_type: [''],
      bedrooms: [''],
      bathrooms: [''],
      amenity_laundry: [''],
      amenity_parking: [''],
      laundry: [''],
      parking: [''],
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
      private_room: [false],
      private_bath: [false],
      amenities: this.fb.array([])
    });
  }

  // Helper to randomly select a category
  getRandomCategory(): string {
    const randomIndex = Math.floor(Math.random() * this.categoryOptions.length);
    return this.categoryOptions[randomIndex];
  }

  postDataAndPatchForm(): void {
    const payload = {}; // Define any payload required by your API.

    this.dataService.post<any>(this.apiUrl, payload).subscribe(
      (response) => {
        this.patchForm(response);
        this.showForm = true;
      },
      (error) => {
        console.error('Error posting data to backend:', error);
      }
    );
  }

  patchForm(apiResponse: any): void {
    // Determine category value: use API value if available, else pick a random one.
    const categoryFromApi = apiResponse.listing_details?.Category;
    const categoryValue = categoryFromApi ? categoryFromApi : this.getRandomCategory();

    // Patch the main form controls using both top-level and nested objects.
    this.listingForm.patchValue({
      title: apiResponse.title,
      description: apiResponse.description,
      price: apiResponse.additional_suggestions.price,
      location: apiResponse.additional_suggestions.location,
      bathrooms: apiResponse.additional_suggestions.bathrooms,
      bedrooms: apiResponse.additional_suggestions.bedrooms,
      borough: apiResponse.listing_details.Borough,
      zipcode: apiResponse.listing_details.Zip,
      category: categoryValue,
      sqft: apiResponse.listing_details.Sqft,
      apt_type: apiResponse.listing_details["Housing Type"],
      laundry: apiResponse.listing_details.Laundry,
      parking: apiResponse.listing_details.Parking,
      pets_cat: apiResponse.listing_details.Cats,
      pets_dog: apiResponse.listing_details.Dogs,
      is_furnished: apiResponse.listing_details.Furnished,
      no_smoking: apiResponse.listing_details["No Smoking"],
      wheelchaccess: apiResponse.listing_details["Wheelchair accessible"],
      airconditioning: apiResponse.listing_details["Air conditioning"],
      ev_charging: apiResponse.listing_details["EV charging"],
      available_on: apiResponse.listing_details["Available On"],
      street: apiResponse.listing_details.Street,
      city: apiResponse.listing_details.City,
      private_room: !!apiResponse.listing_details["Private Room"],
      private_bath: !!apiResponse.listing_details["Private Bath"]
    });

    // Patch the amenities FormArray from additional_suggestions.amenities.
    const amenitiesArray = this.listingForm.get('amenities') as FormArray;
    amenitiesArray.clear();
    if (
      apiResponse.additional_suggestions.amenities &&
      Array.isArray(apiResponse.additional_suggestions.amenities)
    ) {
      apiResponse.additional_suggestions.amenities.forEach((amenity: string) => {
        amenitiesArray.push(new FormControl(amenity));
      });
    }
  }
}
