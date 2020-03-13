import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import {AlertController, NavController} from '@ionic/angular';
import {Clipboard} from '@ionic-native/clipboard/ngx';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Email requis.' },
      { type: 'pattern', message: 'Entrer un email valide.' }
    ],
    password: [
      { type: 'required', message: 'Mot de passe requis.' },
      { type: 'minlength', message: 'Le mot de passe doit comporter au moins 5 caractères.' }
    ]
  };

  constructor(private navCtrl: NavController,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              public alertController: AlertController) { }

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
  tryRegister(value) {
    this.authService.registerUser(value)
        .then(res => {
          console.log(res);
          this.errorMessage = '';
          this.successMessage = 'Votre compte a été créé. Veuillez vous connecter.';
        }, err => {
          console.log(err);
          this.errorMessage = err.message;
          this.successMessage = '';
        });
  }
  goLoginPage(){
    this.navCtrl.navigateBack('');
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
