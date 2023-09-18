import { ChangeDetectionStrategy , Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  template: `
      <div class="d-flex justify-content-start align-items-center">
            <ng-container *ngFor="let icon of starIcons">
              <mat-icon>{{ icon }}</mat-icon>
            </ng-container>
            <span>{{rating}}</span>
      </div>
  `,
  styleUrls: ['./star-rating.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StarRatingComponent implements OnInit{
  @Input() rating: number | undefined;
  starIcons: string[] = [];

  ngOnInit(): void {
    this.calculateStarIcons();
  }

  private calculateStarIcons() {
    if(!this.rating){
      this.rating = 0
    }
    const fullStars = Math.floor(this.rating);
    const halfStar = this.rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      this.starIcons.push('star');
    }

    if (halfStar) {
      this.starIcons.push('star_half');
    }

    while (this.starIcons.length < 5) {
      this.starIcons.push('star_border');
    }
  }
}
