import { Component, OnInit } from '@angular/core';
import { CardGenderComponent } from '../card-gender/card-gender.component';
import { GenreService, Genre } from '../../../core/services/genre.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel-gender',
  standalone: true,
  imports: [CardGenderComponent, CommonModule],
  templateUrl: './carousel-gender.component.html',
  styleUrl: './carousel-gender.component.scss',
})
export class CarouselGenderComponent implements OnInit {
  genres: Genre[] = [];
  visibleGenres: Genre[] = [];
  startIndex: number = 0;
  readonly PAGE_SIZE: number = 6;

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.loadGenres();
  }

  loadGenres(): void {
    this.genreService.getGenres().subscribe({
      next: (data: Genre[]) => {
        this.genres = data;
        this.updateVisibleGenres();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des genres', error);
      },
    });
  }

  updateVisibleGenres(): void {
    const endIndex = (this.startIndex + this.PAGE_SIZE) % this.genres.length;
    if (endIndex > this.startIndex) {
      this.visibleGenres = this.genres.slice(this.startIndex, endIndex);
    } else {
      this.visibleGenres = [
        ...this.genres.slice(this.startIndex),
        ...this.genres.slice(0, endIndex),
      ];
    }
  }

  next(): void {
    this.startIndex = (this.startIndex + 1) % this.genres.length;
    this.updateVisibleGenres();
  }

  prev(): void {
    this.startIndex =
      (this.startIndex - 1 + this.genres.length) % this.genres.length;
    this.updateVisibleGenres();
  }
}
