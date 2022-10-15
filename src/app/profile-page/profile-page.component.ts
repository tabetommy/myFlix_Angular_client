import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
 userInfo:any = {};
 favouriteMovies:any[] =[];


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUserProfile(),
    this. displayUsersFavMovies()
  }

  getUserProfile(): void {
    this.fetchApiData.getUserInfo().subscribe((resp: any) => {
      this.userInfo=resp;
      console.log(this.userInfo)
      return this.userInfo
      });
    }
  
  displayUsersFavMovies(): void{
    this.fetchApiData.getusersFavMovies().subscribe((resp:any)=>{
      this.favouriteMovies=resp;
      console.log(this.favouriteMovies)
      return this.favouriteMovies
    })
  }


  
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
    width: '280px'
    });
  }

  //reroute app to movies
  moviesRoute(): void{
    this.router.navigate(['movies']);
  }

  openMoviesRoute(): void {
    this.router.navigate(['movies']);
  }

  openProfileRoute(): void {
    this.router.navigate(['profile']);
  }

  logout(): void{
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.router.navigate(['welcome']);
  }

}
