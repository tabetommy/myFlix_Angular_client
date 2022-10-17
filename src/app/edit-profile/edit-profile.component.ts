import { Component, OnInit,Input } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';
// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

/**
 * contains all neccesary states, data and functions to edit users data
 */
export class EditProfileComponent implements OnInit {
  @Input() userData = { Username: '', Password:'', Email: '', Birthday:''};

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  /**
   * makes api call to send edited user data to backend
   */
  editUserData(): void {
  this.fetchApiData.editUserInfo(this.userData).subscribe((result) => {
   this.dialogRef.close(); 
   console.log(result)
   localStorage.removeItem('user');
   localStorage.removeItem('token');
   localStorage.setItem('user', result.user.Username);
   localStorage.setItem('token', result.token);
   window.location.reload()
   this.snackBar.open(result, 'OK', {
      duration: 2000
   });
  }, (result) => {
    console.log(result)
    this.snackBar.open(result, 'OK', {
      duration: 2000
    });
  });
}

}
