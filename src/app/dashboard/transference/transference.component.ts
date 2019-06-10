import { Component } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-transference',
  templateUrl: './transference.component.html',
  styleUrls: ['./transference.component.scss']
})
export class TransferenceComponent {
  identification: string;
  value: number;

  constructor(
    private dialogRef: MatDialogRef<TransferenceComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  onCancelClick() {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.userService.transfer(this.identification, this.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSnackBar('Transfered with success');
          this.dialogRef.close();
        },
        err => {
          this.showSnackBar(err);
        }
      );
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

}
