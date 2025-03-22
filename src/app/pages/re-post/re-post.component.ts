import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { SpinnerService } from 'src/shared/services/spinner.service';
import { NotificationService } from 'src/shared/services/toastr.service';

@Component({
  selector: 'app-re-post',
  templateUrl: './re-post.component.html',
  styleUrls: ['./re-post.component.scss']
})
export class RePostComponent implements OnInit {

  listingForm: FormGroup;
  minDate!: string;

  private newPostUrl = 'http://localhost:3000/repost/create';

  constructor(private fb: FormBuilder, private dataService: DataService, private spinnerService: SpinnerService,private notificationService: NotificationService, ) {}
  
    ngOnInit(): void {
      this.minDate = this.getCurrentDateTimeLocal();
      
      // Initialize the form with default values and validators for required fields.
      this.listingForm = this.fb.group({
        email: ['fhallock44@gmail.com'],
        password: ['eCom2021!'],
        link: [''],
        dateTime: [''],
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
  
    createNewPost(): void {
      const formValues = this.listingForm.value;
  
      
      let payload = {
        email: formValues.email,
        password: formValues.password,
        link: formValues.link
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
          this.notificationService.showSuccess('Post created successfully', 'Success!');
          // You can perform further actions here if needed.
        },
        (error) => {
          this.notificationService.showError('Something went wrong!', error);
          console.error('Error creating new post:', error);
        }
      );
    }

}
