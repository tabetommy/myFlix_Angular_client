import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SummaryComponent } from '../summary/summary.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

/**
 * Contains code for the movies page where user can view all movies,
 * movies director,genre,summary and 
 * add movie to list of favourite movies
 */
export class MovieCardComponent implements OnInit {

  movies: any[] = []; //contains all movies

  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router:Router,
     ) { }


  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Gets movies data from api
   * @returns an array of movie objects an assigns it to movie varaible
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
      });
    }

  /**
   * Opens a dialog to display movie genre
   * @param name 
   * @param description 
   */
  openGenreDialog(name:string, description:string): void{
    this.dialog.open(GenreComponent,{
      data: {
        Name: name,
        Description: description,
      },
      width: '500px' //assign dialog's width
    })
  }

  /**
   * Opens a dialog to display a movie's director
   * @param name 
   * @param bio 
   */
  openDirectorDialog(name:string, bio:string): void{
    this.dialog.open(DirectorComponent,{
      data: {
        Name: name,
        Bio: bio,     
      },
      width: '500px'
    })
  }

  /**
   *Opens a dialog to display a movie's summary 
   * @param description 
   */
  openSummaryDialog(description:string): void{
      this.dialog.open(SummaryComponent,{
        data: {
          Description: description,        
        },
        width: '500px'
      })
    }

  /**
   * Routes app to movies page
   */
  openMoviesRoute(): void {
      this.router.navigate(['movies']);
    }

  /**
   * Routes app to the user's profile page
   */
  openProfileRoute(): void {
      this.router.navigate(['profile']);
    }

  /**
   * logs user out
   */
  logout(): void{
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.router.navigate(['welcome']);
    }

    
  /**
   * Sends a put request to api to add a movie to the user's list of favourite movies
   * @param movieId 
   */
  addToFavMovies(movieId: string): void{ 
      this.fetchApiData.addMovie(movieId).subscribe((result)=>{
        this.ngOnInit();
      }) 
  
    }
      
    
}



