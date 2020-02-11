import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropboxService } from '../service/dropbox.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  constructor(private router: Router, public dropbox: DropboxService) { }

  ngOnInit() { }

  login(){
    this.dropbox.login().then((success) => {
      this.router.navigate(['/home']);
    }, (err) => {
      console.log(err);
    });

  }

}
