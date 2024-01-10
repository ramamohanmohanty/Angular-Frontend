import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/register.model';
import { UserService } from 'src/app/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: Register = {};

  constructor(private userService: UserService, private router: Router) { }

  userRegister(data: any) {
    this.userService.createUser(data)
  .subscribe(
    (response: string) => {
      console.log(response); // This will log "User Saved Successfully"
      console.log('User Saved Successfully');
      this.alertSave('success', 'User Saved Successfully');
      this.router.navigate(['/login']);
    },
    (error: any) => {
      console.error('Error occurred during login:', error);
      this.alertSave('error', 'Login Error', 'An error occurred during login. Please try again.');
    }
  );
  }
  

  alertSave(icon: 'success' | 'error', title: string, text?: string) {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
    }).then(() => {
      if (icon === 'success') {
        location.reload();
      }
    });
  }
}
