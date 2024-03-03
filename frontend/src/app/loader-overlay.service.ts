import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoaderOverlayComponent } from './loader-overlay/loader-overlay.component';

@Injectable({
  providedIn: 'root',
})
export class LoaderOverlayService {
  constructor(private readonly dialog: MatDialog) {}

  show(): MatDialogRef<any> {
    return this.dialog.open(LoaderOverlayComponent, { disableClose: true });
  }

  close(dialog: MatDialogRef<any>): void {
    dialog.close();
  }
}
