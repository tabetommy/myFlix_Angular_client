import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { GenreComponent } from '../genre/genre.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies: any[] = [];
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
     ) { }


  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        return this.movies;
      });
    }

    openGenreDialog(name:string, description:string): void{
      this.dialog.open(GenreComponent,{
        data: {
          Name: name,
          Description: description,
        },
        width: '500px'
      })
    }


    openDirectorDialog(name:string, bio:string): void{
      this.dialog.open(GenreComponent,{
        data: {
          Name: name,
          Bio: bio,
          
        },
        width: '500px'
      })
    }

    openSummaryDialog(description:string): void{
      this.dialog.open(GenreComponent,{
        data: {
          Description: description,        
        },
        width: '500px'
      })
    }
}



