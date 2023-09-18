import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  isExpanded = false; // search bar
  @Input() mobile:boolean = false
  categories$ = this.category.getAllCategory()
  constructor(private category:CategoryService){

  }
  toggleSearch() {
    this.isExpanded = !this.isExpanded;
  }

  onBlur(event: FocusEvent) {
    const target = event.relatedTarget as HTMLElement;
    if (target && (target.tagName === 'INPUT' || target.tagName === 'SELECT')) {
      event.preventDefault();
    } else {
      this.isExpanded = false;
    }
  }
}
