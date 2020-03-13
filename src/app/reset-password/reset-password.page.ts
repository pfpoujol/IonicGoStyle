import { Component, OnInit } from '@angular/core';
import {Clipboard} from '@ionic-native/clipboard/ngx';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(public alertController: AlertController) { }

  ngOnInit() {
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
