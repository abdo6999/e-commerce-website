import { Component, Input, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg',
  template: `<span  [ngClass]="getClass()" [innerHTML]="svgIcon"></span>`,
  styleUrls: ['./svg.component.scss'],
})
export class SvgComponent implements OnChanges {
// The file name of the SVG icon to display
  @Input() public name?: string;
// The sanitized HTML string for the SVG icon
  public svgIcon:  SafeHtml | undefined;

  constructor(
    private httpClient: HttpClient,
    private sanitizer: DomSanitizer,
    ) {
  }

  public ngOnChanges(): void {
// If no icon name is provided, clear the displayed icon
    if (!this.name) {
      this.svgIcon = undefined;
      return;
    }
    // Otherwise, fetch the SVG file and sanitize the HTML for display
    this.httpClient
      .get(`./assets/${this.name}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.svgIcon = this.sanitizer.bypassSecurityTrustHtml(value);
      });
  }
  // Returns the class name for the icon element, which is based on the icon name
  getClass(): string {
    if (this.name) {
      return `icon-${this.name}`;
    } else {
      return '';
    }
  }
}
