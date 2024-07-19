import { Component, OnInit } from '@angular/core';
import { CarouselBannerService } from '../../../core/services/carousel-banner.service';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  filePath: string;
  title: string;
  authorName: string;
  tome: number;
  buyLink: string;
}

@Component({
  selector: 'app-carousel-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-banner.component.html',
  styleUrl: './carousel-banner.component.scss',
})
export class CarouselBannerComponent implements OnInit {
  items: CarouselItem[] = [];
  currentIndex: number = 0;

  constructor(private carouselBannerService: CarouselBannerService) {}

  ngOnInit(): void {
    this.carouselBannerService.getCarouselItems().subscribe((data) => {
      this.items = data;
      this.setupInfiniteScroll();
    });
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  setSlide(index: number): void {
    this.currentIndex = index;
  }

  setupInfiniteScroll(): void {
    setInterval(() => {
      this.nextSlide();
    }, 4500);
  }
}
