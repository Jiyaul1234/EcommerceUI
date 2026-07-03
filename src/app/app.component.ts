import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent, FooterComponent, LoadingSpinnerComponent } from '@shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, LoadingSpinnerComponent],
  template: `
    <div class="d-flex flex-column min-vh-100">
      <app-navbar></app-navbar>
      <main class="flex-grow-1">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-loading-spinner></app-loading-spinner>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .min-vh-100 {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'ECommerce Application';
}
