import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Login } from 'src/app/login.model';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData: Login = {};

  constructor(private userService: UserService, private router: Router) { }

  // userLogin() {
  //   this.userService.loginUser(this.loginData).subscribe((result:any) => {
  //       localStorage.setItem("accessToken",result.accessToken);
  //       console.log('User Logged In Successfully');
  //       this.router.navigate(['/property']);
  //       this.alertSave('success', 'User Login Successfully');
  //     },
  //     (error: any) => {
  //       console.error('Error logging in:', error);
  //       this.alertSave('error', 'Error Logging In', 'An error occurred during login');
  //     }
  //   );
  // }

  userLogin(data: any) {
    this.userService.loginUser(data)
      .subscribe(
        (result: any) => {
          localStorage.setItem("accessToken", result.accessToken);
          console.log('User Logged In Successfully');
          this.alertSave('success', 'User Login Successfully');
          this.router.navigate(['/property']);
        },
        (error: any) => {
          console.error('Error occurred during login:', error);
          this.alertSave('error', 'Login Error', 'An error occurred during login. Please try again.');
        }
      );
  }
  
  alertSave(type: 'success' | 'error', title: string, text?: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: type,
    }).then(() => {
      if (type === 'success') {
        location.reload(); // Reload the page on success
      }
    });
  }
}
