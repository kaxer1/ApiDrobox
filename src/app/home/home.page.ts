import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { DropboxService } from '../services/dropbox.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  depth: number = 0;
  folders: any;
  usuario: any;
  imgUser: string;
  name:string;

  constructor(public navCtrl: NavController, public dropbox: DropboxService, public loadingCtrl: LoadingController) {}

   ngOnInit() {
    this.dropbox.setAccessToken("Access token");
    this.obtenerCliente();
    this.ionViewDidLoad();
  }

  obtenerCliente(){

    this.dropbox.getUserInfo().subscribe((data: any) =>{
      this.usuario = data;
      this.imgUser = this.usuario['profile_photo_url'];
      console.log(this.name = this.usuario['name']['display_name']);
    });

  }

  ionViewDidLoad() {

    this.folders = [];

    this.animacion();

    this.dropbox.getFolders().subscribe((data: any)=> {
      this.folders = data;
    }, (err) => {
      console.log(err);
    });

  }

  openFolder(path) {
    this.animacion();
    this.navCtrl.pop();

    this.dropbox.getFolders(path).subscribe((data: any) => {
      this.folders = data;
      this.depth++;

    }, err => {
      console.log(err);
    });
  }

  goBack() {
    this.animacion();
    this.navCtrl.pop();

    this.dropbox.goBackFolder().subscribe((data: any) => {
      this.folders = data;
      this.depth--;
    }, err => {
      console.log(err);
    });
  }

  animacion(){
    this.loadingCtrl.create({
      message: 'Sincronizando Dropbox...'
    }).then((loadingElement) => {
      loadingElement.present();

      var ref = this;
      setTimeout(function () {
        ref.loadingCtrl.dismiss();
      }, 1500)

    });
  }

  downloadAndOpen(path){
    console.log("para descargar", path);

    this.dropbox.descargar(path).subscribe( (data: any) => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }
}
