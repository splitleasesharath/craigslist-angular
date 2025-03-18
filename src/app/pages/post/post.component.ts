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

  constructor(private fb: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    // Initialize the form with default values.
    // Note that private_room and private_bath are now booleans.
    this.listingForm = this.fb.group({
      email: ['bdouglas0927@gmail.com'],
      password: ['eCom2021!'],
      title: [''],
      description: [''],
      price: [''],
      borough: [''],
      zipcode: [''],
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
      // Updated: private_room and private_bath as booleans.
      private_room: [false],
      private_bath: [false],
      // FormArray for amenities
      amenities: this.fb.array([])
    });
  }

  postDataAndPatchForm(): void {
    const payload = {}; // Define any payload required by your API.

    this.dataService.post<any>(this.apiUrl, payload).subscribe(
      (response) => {
        /* 
          Expected response structure:
          {
            additional_suggestions: {
              amenities: [ "No laundry on site", "Street parking available", "Furnished" ],
              bathrooms: "2",
              bedrooms: "1",
              location: "Harlem / Morningside",
              price: "1900"
            },
            description: "Immaculately furnished 1 BD/2BTH apartment situated in the heart of Harlem/Morningside...",
            listing_details: {
              "Air conditioning": false,
              "Available On": "",
              "Bathrooms": 1,
              "Bedrooms": 1,
              "Borough": "brooklyn",
              "Category": "",
              "Cats": false,
              "City": "",
              "Description": "If you are looking for a Pied-a-terre situation, keep reading! ...",
              "Dogs": false,
              "EV charging": false,
              "Furnished": true,
              "Housing Type": "apartment",
              "Laundry": "no laundry on site",
              "Link": "https://docs.google.com/document/...",
              "Location": "Harlem / Morningside",
              "No Smoking": true,
              "Parking": "street parking",
              "Price": 105,
              "Private Bath": true,
              "Private Room": true,
              "Rent Period": "",
              "Sqft": "",
              "Street": "",
              "Title": "Pay p/night renting weekdays only! Ground Floor Spacious Apartment",
              "Wheelchair accessible": false,
              "Zip": 11221
            },
            title: "COMMUTER'S HAVEN: 1BD/2BTH; FULLY-FURNISHED GEM with BREATHTAKING NYC VIEWS- Lower Manhattan"
          }
        */
        this.patchForm(response);
        // Reveal the form after successful patching.
        this.showForm = true;
      },
      (error) => {
        console.error('Error posting data to backend:', error);
      }
    );
  }

  patchForm(apiResponse: any): void {
    // Patch the main form controls using both top-level and nested objects.
    this.listingForm.patchValue({
      // Top-level properties
      title: apiResponse.title,
      description: apiResponse.description,
      // Use additional_suggestions for core listing details
      price: apiResponse.additional_suggestions.price,
      location: apiResponse.additional_suggestions.location,
      bathrooms: apiResponse.additional_suggestions.bathrooms,
      bedrooms: apiResponse.additional_suggestions.bedrooms,
      // Additional details from listing_details
      borough: apiResponse.listing_details.Borough,
      zipcode: apiResponse.listing_details.Zip,
      category: apiResponse.listing_details.Category,
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
      // Updated: convert to booleans
      private_room: apiResponse.listing_details["Private Room"] ? true : false,
      private_bath: apiResponse.listing_details["Private Bath"] ? true : false
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
