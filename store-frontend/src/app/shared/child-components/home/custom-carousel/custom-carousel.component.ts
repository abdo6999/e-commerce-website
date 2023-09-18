import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-custom-carousel',
  templateUrl: './custom-carousel.component.html',
  styleUrls: ['./custom-carousel.component.scss'],
})
export class CustomCarouselComponent implements OnInit {

  @Input() name !: string
  @Input() products !: Product[]
  currentIndex = 0;
  slideWidth = 0;
  itemsPerSlide!:number
  @ViewChild("carousel") carousel!:ElementRef;

  constructor(private productService:ProductService){

  }
    ngOnInit(): void {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1200) {
        this.itemsPerSlide = 4;
      } else if (windowWidth >= 992) {
        this.itemsPerSlide = 3;
      } else if(windowWidth >= 768) {
        this.itemsPerSlide = 2;
      } else {
        this.itemsPerSlide = 1;
      }
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1200) {
        this.itemsPerSlide = 4;
        this.currentIndex = 0;
        this.reset()
      } else if (windowWidth >= 992) {
        this.itemsPerSlide = 3;
        this.currentIndex = 0
        this.reset()
      } else if(windowWidth >= 768) {
        this.itemsPerSlide = 2;
        this.currentIndex = 0
        this.reset()
      } else {
        this.itemsPerSlide = 1;
        this.currentIndex = 0
        this.reset()
      }
    }
  getFilteredProductsCount(categoryName: string,products:Product[]): number {
    const filteredProducts = products.filter(product => product.category === categoryName);
    return filteredProducts.length;
  }
  prevSlide() {
    if (this.carousel) {
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
      this.scrollToSlide();
    }
  }

  nextSlide() {
    if (this.carousel) {
      this.currentIndex = Math.min(this.currentIndex + 1, this.products.length - this.itemsPerSlide);
      this.scrollToSlide();
    }
  }

  scrollToSlide() {
    if (this.carousel) {
      this.calculateSlideWidth();
      this.carousel.nativeElement.style.transform = `translateX(-${this.currentIndex * this.slideWidth / this.itemsPerSlide}px)`;
    }
  }
  reset() {
    this.carousel.nativeElement.style.transform = `translateX(0px)`;
  }
  calculateSlideWidth() {
    if (this.carousel) {
      const item = this.carousel.nativeElement
      if (item) {
        this.slideWidth = item.clientWidth + parseFloat(getComputedStyle(item).marginRight);
      }
    }
  }
  sendProductData(product:Product) {
    this.productService.sendProductData(product)
  }
}
