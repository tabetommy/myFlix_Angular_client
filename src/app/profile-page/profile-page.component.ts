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
 favouriteMovieIds:any[] =[];
 userFavMoviesDetails: any[]=[]


  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.getUserProfile(),
    this. getUsersFavMoviesIds(),
    this.getUsersFavMovieDetails()
  }

  getUserProfile(): void {
    this.fetchApiData.getUserInfo().subscribe((resp: any) => {
      this.userInfo=resp;
      return this.userInfo
      });
    }
  
    getUsersFavMoviesIds(): void{
    this.fetchApiData.getusersFavMovies().subscribe((resp:any)=>{
      this.favouriteMovieIds=resp;
      return this.favouriteMovieIds
    })
  }


  getUsersFavMovieDetails(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        resp.map((movie: any)=>{
          if(this.favouriteMovieIds.includes(movie._id)){
            this.userFavMoviesDetails.push(movie)
          }
        })
        return this.userFavMoviesDetails
      });
    }

  
  openEditProfileDialog(): void {
    this.dialog.open(EditProfileComponent, {
    width: '280px'
    });
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
