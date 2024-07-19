import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselBannerComponent } from './components/carousel-banner/carousel-banner.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarouselBannerComponent,
    HeaderComponent,
    FooterComponent,
  ],
  exports: [CarouselBannerComponent, HeaderComponent, FooterComponent],
})
export class SharedModule {}
