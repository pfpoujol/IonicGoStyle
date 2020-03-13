import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Un email est requis.' },
      { type: 'pattern', message: 'Veuillez entrer une adresse mail valide.' }
    ],
    password: [
      { type: 'required', message: 'Un mot de passe est requis.' },
      { type: 'minlength', message: 'Votre mot de passe doit faire un minimum de 5 caractères.' }
    ]
    };


  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      public alertController: AlertController
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  tryLogin(value) {
    this.authService.doLogin(value)
        .then(res => {
          this.validationsForm.reset();
          console.log('login success !');
        }, err => {
          this.errorMessage = err.message;
          console.log(err);
        });
  }
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erreur',
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
