import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CarouselItem {
  filePath: string;
  title: string;
  authorName: string;
  tome: number;
  buyLink: string;
}

@Injectable({
  providedIn: 'root',
})
export class CarouselBannerService {
  private dataUrl = 'assets/data/carouselData.json';

  constructor(private http: HttpClient) {}

  getCarouselItems(): Observable<CarouselItem[]> {
    return this.http.get<CarouselItem[]>(this.dataUrl);
  }
}
