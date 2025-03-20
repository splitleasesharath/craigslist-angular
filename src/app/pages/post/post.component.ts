import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  listingForm: FormGroup;
  showForm: boolean = false;
  // Existing endpoint for postDataAndPatchForm remains unchanged.
  private apiUrl = 'http://localhost:3000/flask/create_craigslist';
  // New endpoint for the new post call.
  private newPostUrl = 'http://localhost:3000/post/create';

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

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    // Initialize the form with default values and validators for required fields.
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
      dateTime: [''],
      amenities: this.fb.array([])
    });
  }

  // Helper to randomly select a category
  getRandomCategory(): string {
    const randomIndex = Math.floor(Math.random() * this.categoryOptions.length);
    return this.categoryOptions[randomIndex];
  }

  postDataAndPatchForm(): void {
    const payload = {}; // Existing payload for this function.
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

  // New function to create a post with a different payload structure and endpoint.
  createNewPost(): void {
    const formValues = this.listingForm.value;

    
    let payload = {
      email: formValues.email,
      password: formValues.password,
      title: formValues.title,
      description: formValues.description,
      price: formValues.price,
      borough: formValues.borough,
      zipcode: formValues.zipcode.toString(),
      category: formValues.category ? formValues.category : this.getRandomCategory(),
      location: formValues.location,
      amenities: {
        laundry: formValues.amenity_laundry ? formValues.amenity_laundry : formValues.laundry,
        parking: formValues.amenity_parking ? formValues.amenity_parking : formValues.parking
      },
      sqft: formValues.sqft.toString(),
      pets_cat: formValues.pets_cat ? "TRUE" : "FALSE",
      pets_dog: formValues.pets_dog ? "TRUE" : "FALSE",
      is_furnished: formValues.is_furnished ? "TRUE" : "FALSE",
      no_smoking: formValues.no_smoking ? "TRUE" : "FALSE",
      wheelchaccess: formValues.wheelchaccess ? "TRUE" : "FALSE",
      airconditioning: formValues.airconditioning ? "TRUE" : "FALSE",
      ev_charging: formValues.ev_charging ? "TRUE" : "FALSE",
      available_on: formValues.available_on,
      street: formValues.street,
      city: formValues.city,
      rent: formValues.rent,
      laundry: formValues.laundry,      // top-level laundry field
      apt_type: formValues.apt_type,
      parking: formValues.parking,      // top-level parking field
      bedrooms: formValues.bedrooms,
      bathrooms: formValues.bathrooms,
      rent_period: formValues.rent_period,
      private_room: formValues.private_room ? 1 : 0,
      private_bath: formValues.private_bath ? 1 : 0
    };

    if (formValues.dateTime){
      const date = new Date(formValues.dateTime);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);
      payload['targetDateTime'] = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    this.dataService.post<any>(this.newPostUrl, payload).subscribe(
      (response) => {
        console.log('New post successful:', response);
        // You can perform further actions here if needed.
      },
      (error) => {
        console.error('Error creating new post:', error);
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
