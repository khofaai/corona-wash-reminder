import { Component, OnInit } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NotificationService } from '../notification.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AboutComponent } from '../modals/about/about.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  langue: string = 'EN';

  constructor(
    private localNotifications: LocalNotifications,
    private mainService : NotificationService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    public modalController: ModalController
    ) {
  }

  async ngOnInit(){

    let lang = await this.mainService.getLanguage();
    
    lang !== null && (this.langue = lang);
  }

  async schedule(){
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 2000,
      
    });
    await this.mainService.schedule(this.localNotifications, this.langue);

    await loading.present().then(() => {
      setTimeout(() => {
        this.showToast();
      }, 2000)
    });

  }

  async showToast(){
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      color: 'success'
    });
    await toast.present();
  }

  languageSelected(event){
    this.langue = event.target.value;
  }

  async presentModal() {

    //this.list();
    const modal = await this.modalController.create({
      component: AboutComponent
    });
    
    return await modal.present();
  }

  async list(){
    let results = await this.localNotifications.getAll();
    console.log(results);
  }
}
