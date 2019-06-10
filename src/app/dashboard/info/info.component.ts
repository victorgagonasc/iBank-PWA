import { Component } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material';
import { TransferenceComponent } from '../transference/transference.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['auth/signin']);
  }

  openTransferenceDialog() {
    this.dialog.open(TransferenceComponent, {
      width: '300px'
    });
  }
}
