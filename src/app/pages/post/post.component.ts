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
    // Initialize the form with default values from your payload.
    // Note: The form is initially hidden (showForm = false).
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
      pets_cat: [''],
      pets_dog: [''],
      is_furnished: [''],
      no_smoking: [''],
      wheelchaccess: [''],
      airconditioning: [''],
      ev_charging: [''],
      available_on: [''],
      street: [''],
      city: [''],
      private_room: [0],
      private_bath: [0],
      // Add a FormArray for any amenities if needed.
      amenities: this.fb.array([])
    });
  }

  postDataAndPatchForm(): void {
    const payload = {}; // Define any payload required by your API.

    this.dataService.post<any>(this.apiUrl, payload).subscribe(
      (response) => {
        // Expected response structure:
        // {
        //   additional_suggestions: {
        //     amenities: [ "Fully Furnished", "Stunning NYC Views" ],
        //     bathrooms: "1",
        //     bedrooms: "2",
        //     location: "Lower East Side",
        //     price: "2500"
        //   },
        //   description: "....",
        //   title: "...."
        // }
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
    // Patch the simple form controls
    this.listingForm.patchValue({
      title: apiResponse.title,
      description: apiResponse.description,
      price: apiResponse.additional_suggestions.price,
      location: apiResponse.additional_suggestions.location,
      bathrooms: apiResponse.additional_suggestions.bathrooms,
      bedrooms: apiResponse.additional_suggestions.bedrooms
    });

    // Patch the amenities FormArray (if any)
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
