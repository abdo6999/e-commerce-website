import { Component, OnInit,ChangeDetectionStrategy, HostListener, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product/product.service';
import { Response } from 'src/app/models/auth';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  responsiveOptions: any[] | undefined;
  productsByCategories$ = this.productService.getAllProductsWithCategory();
  @ViewChild('carousel') carousel: ElementRef | undefined;

  constructor(private productService:ProductService,private categoryService:CategoryService){

  }


}


