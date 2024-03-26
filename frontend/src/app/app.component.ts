import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ResponsiveService } from './core/services/responsive/responsive.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private responsiveService: ResponsiveService) {}

  @HostListener('window:resize', ['$event'])
  onResize({ event }: { event?: Event; } = {}): void {
    if(window.innerWidth <= 768) this.responsiveService.isMobileSub$.next(true);
    else this.responsiveService.isMobileSub$.next(false);
    this.responsiveService.screenWidthSub$.next(window.innerWidth);
  }
}
