import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { LoginFormComponent } from '../login-form/login-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})

/**
 * This function host the user's registration and login forms
 */
export class WelcomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router:Router
    ) { }
  ngOnInit(): void {
  }

  /**
 * opens up a dialog containing a user registration form
 */
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
      });
    }

  /**
 * opens up a dialog containing a user login form
 */
  openUserLoginDialog(): void {
      this.dialog.open(LoginFormComponent, {
      width: '280px'
      });
    }

    openMovies(): void{
      this.router.navigate(['movieswithoutAuth']); 
    }

}
