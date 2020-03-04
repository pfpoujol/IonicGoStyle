import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tab-list-promos',
  templateUrl: './tab-list-promos.page.html',
  styleUrls: ['./tab-list-promos.page.scss'],
})
export class TabListPromosPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  logout() {
    this.authService.doLogout();
    this.router.navigate(['login']);
  }
}
