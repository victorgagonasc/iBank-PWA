import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
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
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.required]
    });

    this.authService.logout();

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard';
  }

  get f() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) { return; }

    this.loading = true;
    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.showSnackBar('Authenticated with success');
          this.router.navigate([this.returnUrl]);
        },
        err => {
          this.showSnackBar(err);
          this.loading = false;
        }
      );
  }

  signUp() {
    this.router.navigate(['auth/signup']);
  }

  showSnackBar(message: string) {
    this.snackBar.open(message, null, { duration: 3000 });
  }
}
