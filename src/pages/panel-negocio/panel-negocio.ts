import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import {NegocioProvider} from '../../providers/negocio/negocio';
import {EstadisticasProvider} from '../../providers/estadisticas/estadisticas';

@Component({
  selector: 'page-panel-negocio',
  templateUrl: 'panel-negocio.html',
})
export class PanelNegocioPage {
  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 3;

  tipo:number = 0;

  constructor(public _ep: EstadisticasProvider, public _np: NegocioProvider, public menuCtrl: MenuController, public navCtrl: NavController, public navParams: NavParams) {
    this.lottieConfig = {
        path: 'assets/menu-ios.json',
        autoplay: false,
        loop: false,
        autoloadSegments: false
    };
  }

  ionViewWillEnter(){
    this._ep.muestraDatos(Number(this._np.id_negocio));
    this._ep.likesAdm(Number(this._np.id_negocio));
    // this.menuCtrl.enable(true, 'admin');
    // this.menuCtrl.enable(false, 'user');
  }

  ionViewDidLoad() {
    this._ep.contadorVisitas(Number(this._np.id_negocio), 0, this.tipo);
    this._ep.usuariosActivos(Number(this._np.id_negocio));
    this.menuCtrl.swipeEnable(true);
    // console.log('ionViewDidLoad PanelNegocioPage');
    this.menuCtrl.get().ionOpen.subscribe(()=>{
      this.play();
      // console.log("abierto")
    });
    this.menuCtrl.get().ionClose.subscribe(()=>{
      this.pause();
      // console.log("cerrado")
    });
  }

  handleAnimation(anim: any) {
      this.anim = anim;
      // console.log(anim)
  }

  play() {
      this.anim.setSpeed(this.animationSpeed);
      this.anim.playSegments([[42, 10]], true);
  }

  pause() {
      this.anim.setSpeed(this.animationSpeed);
      this.anim.playSegments([[10, 90]], true);
  }

}
