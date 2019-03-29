import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {URL_VIRTSERVER} from '../../config/url.servicios';


@Injectable()
export class HistorialProvider {


  transacciones:any[] = [];
  transaccionesAdm:any[] = [];

  pagina:number = 0;

  constructor(public http: Http) {

  }


  historial(id_usuario){

    let promesa = new Promise((resolve, reject)=>{

      let body       : string = "&id_usuario=" + id_usuario + "&pagina=" + this.pagina,
           type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
           headers    : any     = new Headers({ 'Content-Type': type}),
           options    : any     = new RequestOptions({ headers: headers }),
           url        : any     = URL_VIRTSERVER + "historial.php";

       this.http.post(url, body, options).map(res => res.json())
       .subscribe(data =>
       {
         this.transacciones.push(...data);

         this.pagina +=1;
         resolve();
       });
    });

    return promesa;
  }

  historialAdm(id_negocio, tipo){

    let promesa = new Promise((resolve, reject)=>{

      let body       : string = "&id_negocio=" + id_negocio + "&tipo=" + tipo + "&pagina=" + this.pagina,
           type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
           headers    : any     = new Headers({ 'Content-Type': type}),
           options    : any     = new RequestOptions({ headers: headers }),
           url        : any     = URL_VIRTSERVER + "historialAdm.php";

       this.http.post(url, body, options).map(res => res.json())
       .subscribe(data =>
       {
         this.transaccionesAdm.push(...data);

         this.pagina +=1;
         resolve();
       });
    });

    return promesa;
  }

}
