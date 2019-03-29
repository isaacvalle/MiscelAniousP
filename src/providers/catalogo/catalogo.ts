import {Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';

import {URL_VIRTSERVER} from '../../config/url.servicios';
import 'rxjs/add/operator/map';


@Injectable()
export class CatalogoProvider {

  public catalogo:any = [];
  negocios:any = [];
  url:any = URL_VIRTSERVER + "categorias.php";

  url2:any = URL_VIRTSERVER + "estados.php";

  estados:any = [];
  municipios:any = [];



  constructor(public http: Http) {
    this.cargar_catalogo();
    this.cargar_estados();
  }


  cargar_catalogo(){
    this.http.get(this.url)
    .map(res => res.json())
    .subscribe(data =>
    {
      this.catalogo = data;

    });
  }

  cargar_estados(){
    this.http.get(this.url2)
    .map(res => res.json())
    .subscribe(data =>
    {
      this.estados = data;

    });
  }

  cargar_municipiosporestado(estado:string){

    let body       : string = "&estado=" + estado,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_VIRTSERVER + "municipiosporEstado.php";

    this.http.post(url, body, options).map(res => res.json())
    .subscribe(data =>
    {
      this.municipios = data;

    });
  }

  negociosporEstado(id_categoria:number, estado:string){

    let body       : string = "&id=" + id_categoria + "&estado=" + estado,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_VIRTSERVER + "porEstado.php";

    this.http.post(url, body, options).map(res => res.json())
    .subscribe(data =>
    {
      this.negocios = data;

    });
  }

  negociosporEstado_municipio(id_categoria:number, estado:string, municipio:string){

    let body       : string = "&id=" + id_categoria + "&estado=" + estado + "&municipio=" + municipio,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_VIRTSERVER + "porEstadoymunicipio.php";

    this.http.post(url, body, options).map(res => res.json())
    .subscribe(data =>
    {
      this.negocios = data;

    });
  }

}
