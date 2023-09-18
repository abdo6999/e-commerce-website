import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-svg-viewer',
  template: '<div [innerHTML]="svgContent" [ngClass]="svgClassName"></div>',
  styleUrls: ['./svg-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgViewerComponent {
  @Input() svgName!: string;
  svgContent!: SafeHtml;
  svgClassName: string = '';

  constructor(
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(): void {
    if (this.svgName) {
      this.loadAndSanitizeSvgContent();
    }
  }

  private loadAndSanitizeSvgContent() {
    this.svgClassName = this.extractClassName(this.svgName);

    fetch(`assets/${this.svgName}`)
      .then((response) => response.text())
      .then((data) => {
        this.svgContent = this.sanitizer.bypassSecurityTrustHtml(data);
        this.svgContent
        this.cdr.detectChanges();
      });
  }

  private extractClassName(svgName: string): string {
    const fileNameWithoutExtension = svgName.replace(/\.[^/.]+$/, '');
    return fileNameWithoutExtension;
  }
}
