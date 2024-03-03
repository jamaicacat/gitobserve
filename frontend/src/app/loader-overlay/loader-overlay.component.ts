import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader-overlay',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader-overlay.component.html',
  styleUrl: './loader-overlay.component.scss',
})
export class LoaderOverlayComponent {}
