import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      identification: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  get f() { return this.registerForm.controls; }

  register() {
    if (this.registerForm.invalid) { return; }

    this.loading = true;

    const user: User = this.registerForm.value;
    user.birthDate = new Date(user.birthDate);

    this.authService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          this.showSnackBar('Registered with success');
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.showSnackBar(err.error.message);
          this.loading = false;
        }
      );
  }

  signIn() {
    this.router.navigate(['auth/signin']);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }

}
