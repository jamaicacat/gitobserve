import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor(private fetchService: FetchService) {}

  ngOnInit(): void {
    this.fetchService.test().subscribe((result) => {
      console.log('result:', result)
    })
  }
}
