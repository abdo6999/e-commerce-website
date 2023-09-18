import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  items = [
    {
      image: '/assets/shop-hero-1-product-slide-1.png',
      alt: 'fashion shop',
      title: 'NEW COLLECTION',
      description: 'Unveil the freshest fashion finds!',
      button:"Shop Now",
      color:"btn-success",
      position:"left"
    },
    {
      image: '/assets/shop-hero-3-product-slide-2.png',
      alt: 'Image 1',
      title: 'GROSERIES DELIVERY',
      description: 'Experience Hassle-Free Grocery Delivery',
      button:"Start Now",
      color:"btn-primary",
      position:"center"
    },
    {
      image: '/assets/shop-hero-3-product-slide-2 (1).png',
      alt: 'Image 1',
      title: 'BLACK FRIDAY',
      description: 'Unleash Savings on Black Friday!',
      button:"Start Now",
      color:"btn-primary",
      position:"center"
    },
  ];
}
