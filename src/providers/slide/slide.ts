import {Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {URL_VIRTSERVER} from '../../config/url.servicios';
import 'rxjs/add/operator/map';



@Injectable()
export class SlideProvider {
  url:any = URL_VIRTSERVER + "anuncios.php";
  public anuncios:any = [];

  constructor(public http: Http) {
    this.cargar_anuncios();
  }


  cargar_anuncios(){
    this.http.get(this.url)
    .map(res => res.json())
    .subscribe(data =>
    {
      this.anuncios = data;
    });
  }

}
