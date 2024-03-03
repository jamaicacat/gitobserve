import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchService } from './fetch.service';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Result } from '../../schemas/result';
import { LoaderOverlayService } from './loader-overlay.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [MatDialog],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly baseUrl = 'https://github.com/';
  urlValue: string = '';

  owner: string = '';
  repoName: string = '';

  history: Array<{
    url: string;
    owner: string;
    repoName: string;
    result: Result[];
  }> = [];
  result:
    | { url: string; owner: string; repoName: string; result: Result[] }
    | any = {};

  constructor(
    private readonly fetchService: FetchService,
    private readonly overlay: LoaderOverlayService,
  ) {}

  getMostContributedRepos(url: string): void {
    [this.owner, this.repoName] = url.split('/');
    const dialog = this.overlay.show();

    this.fetchService
      .get(
        `github/common-contributed/?owner=${this.owner}&repoName=${this.repoName}`,
      )
      .subscribe((result: Result[] | any) => {
        this.result = {
          url: `${this.baseUrl}${this.owner}/${this.repoName}`,
          owner: this.owner,
          repoName: this.repoName,
          result,
        };
        this.history.push(this.result);
        this.overlay.close(dialog);
      });
  }

  onInput(url: string): void {
    if (url.startsWith(this.baseUrl)) {
      this.urlValue = url.replace(this.baseUrl, '');
    } else if (url === '') {
      this.urlValue = '';
    } else {
      this.urlValue = url;
    }
  }
}
