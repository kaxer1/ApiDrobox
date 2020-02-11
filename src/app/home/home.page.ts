import { Component, forwardRef, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { DropboxService } from '../service/dropbox.service';
import { ActivatedRoute, Router } from '@angular/router';


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
  accessToken: string;

  public href: string = "";

  constructor(
    public dropbox: DropboxService,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public activeRoute: ActivatedRoute,
    public router: Router) {
      
  }

  urlTree: any; token: any;
  ngOnInit() {
    
    this.encontrarToken();
    this.obtenerCliente();
    this.ionViewDidLoad();
  }

  encontrarToken(){
    this.href = this.router.url;
    this.urlTree = this.router.parseUrl(this.router.url);
    this.token = this.urlTree.fragment;
    // this.token = this.dropbox.accessToken;

    var cadena = this.token,
    arregloDeSubCadenas = cadena.split("=", 2);

    // console.log(arregloDeSubCadenas);
    var accessKey = arregloDeSubCadenas[1];
    // console.log(accessKey);
    var aux =  accessKey.split("&");
    // console.log(aux);
    this.accessToken = aux[0];
    // console.log(this.accessToken);
  }

  obtenerCliente(){

    this.dropbox.getUserInfo(this.accessToken).subscribe((data: any) =>{
      this.usuario = data;
      this.imgUser = this.usuario['profile_photo_url'];
      console.log(this.name = this.usuario['name']['display_name']);
    });

  }

  downloadAndOpen(path){
    this.dropbox.descargar(path).subscribe((data: any) => {
      console.log(data);
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {
    this.folders = [];

    this.animacion();

    this.dropbox.getFolders().subscribe((data: any) => {
      // console.log(data);
      this.folders = data;
      this.loadingCtrl.dismiss();
    }, (err) => {
      console.log(err);
    });
  }

  ionViewDidEnter(){

    this.animacion();

    this.dropbox.getFolders().subscribe((data: any) => {
      this.folders = data;
      this.loadingCtrl.dismiss();
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
      console.log('Estoy en la funcion openFolder', data);
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
      }, 2000)

    });
  }

}
