import {Http, Headers, RequestOptions } from '@angular/http';;
import { Injectable } from '@angular/core';


import {URL_VIRTSERVER} from '../../config/url.servicios';
import 'rxjs/add/operator/map';


@Injectable()
export class PuntosProvider {

  pntsUsuarioNegocio:any = [];

  constructor(public http: Http) {

  }


  puntosUsuarioNegocio(id_usuario:number){

    let body       : string = "&id_usuario=" + id_usuario,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_VIRTSERVER + "puntos.php";

    this.http.post(url, body, options).map(res => res.json())
    .subscribe(data =>
    {
      this.pntsUsuarioNegocio = data;

    });
  }

}
