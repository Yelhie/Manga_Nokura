import { Component, Input } from '@angular/core';
import { Genre } from '../../../core/services/genre.service';

@Component({
  selector: 'app-card-gender',
  standalone: true,
  imports: [],
  templateUrl: './card-gender.component.html',
  styleUrl: './card-gender.component.scss',
})
export class CardGenderComponent {
  @Input() genre!: Genre;
}
