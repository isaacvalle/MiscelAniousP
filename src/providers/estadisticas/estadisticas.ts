import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class EstadisticasProvider {
  baseURL:any = "http://192.168.0.109/virtcoin/estadisticas.php";
  baseURL2:any = "http://192.168.0.109/virtcoin/actualizaLikes.php";
  baseURL3:any = "http://192.168.0.109/virtcoin/verificaLikes.php";
  baseURL4:any = "http://192.168.0.109/virtcoin/negociosLikes.php";
  baseURL5:any = "http://192.168.0.109/virtcoin/visitasAdm.php";
  baseURL6:any = "http://192.168.0.109/virtcoin/activeClientsAdm.php";
  estadisticas:any;
  totPagado:number = 0;
  totRecibido:number = 0;
  yesLike:number;
  totalLikes:number;
  totalVisitas:number;
  totalUsuarios:number;
  // total:number = 0;

  constructor(public http: Http) {

  }

  //funcion que trae los valores TRANSACCIONES, TOT.PAGADO Y TOT.RECIBIDO para la parte de administracion de negocios
  muestraDatos(id_negocio:number){

    let body       : string = "&id_negocio=" + id_negocio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
       this.estadisticas = data[0]["transacciones"];
       this.totPagado = data[0]["pagos"];
       this.totRecibido = data[0]["cobros"];
     });
  }

  //funcion que efectua el sistema de LIKES en la parte de INFO-NEGOCIO en la interfaz del usuario
  recomiendaNegocio(id_usuario, id_negocio, like){
    let body       : string = "&id_usuario=" + id_usuario + "&id_negocio=" + id_negocio + "&like=" + like,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL2;

     this.http.post(url, body, options)
         .subscribe(data =>
            {
             console.log(data);
            });
  }

  //funcion que verifica si un usuario ha dado like a determinado negocio para mostrarlo en estado "encendido" en la interfaz
  likeVerify(id_usuario, id_negocio){

    let body       : string = "&id_usuario=" + id_usuario + "&id_negocio=" + id_negocio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL3;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
          this.yesLike = data;
          // console.log(this.yesLike);
     });
  }

  //funcion que trae el valor FAVORITOS para la parte de administracion de negocios
  likesAdm(id_negocio:number){

    let body       : string = "&id_negocio=" + id_negocio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL4;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
       this.totalLikes = data[0]["recomendaciones"];
        // console.log(this.totalLikes)
     });
  }


  //funcion que cuenta las visitas en la pagina del negocio y las muestra en el panel de control de administracion
  contadorVisitas(id_negocio, sumaVisita, tipo){

    let body       : string = "&id_negocio=" + id_negocio + "&sumaVisita=" + sumaVisita + "&tipo=" + tipo,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL5;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
       this.totalVisitas = data[0]["visitas"];
        // console.log(data[0]["visitas"])
     });
  }

  //funcion que muestra el total de usuarios activos por negocio en la parte de administracion
  usuariosActivos(id_negocio:number){

    let body       : string = "&id_negocio=" + id_negocio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL6;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
       this.totalUsuarios = data;
       // console.log(data)
     });
  }

}
