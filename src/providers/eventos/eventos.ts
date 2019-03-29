import {Http, Headers, RequestOptions} from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class EventosProvider {

  baseURL:any = "http://192.168.0.109/virtcoin/verEventos.php";
  baseURL2:any = "http://192.168.0.109/virtcoin/cateEventos.php";
  baseURL3:any = "http://192.168.0.109/virtcoin/verEventosHoy.php";

  eventosGral:any[] = [];
  categorias:any[] = [];
  eventosActuales:any[] = [];

  diaName:any [] = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  mesNames: any[] = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];

  diaNombre:any [] = ["Domingo","Lunes","Martes","Miécoles","Jueves","Vienes","Sábado"];
  mesNombres: any[] = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  currentDate:string = new Date().toISOString().substring(0, 10);

  constructor(public http: Http) {

  }

  evtsGenerales(tipo:number, estado:string, municipio:string){

    let body       : string = "&tipo=" + tipo + "&fecha=" + this.currentDate + "&estado=" + estado + "&municipio=" + municipio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
       this.eventosGral = data;
       let fechaCard:any = [];
       let primeraFecha:any = [];
       for (let i = 0; i < data.length; i++) {
         fechaCard.push(this.fechaPreview(data[i].fechainicio));
         this.eventosGral[i]["anioinicio"] = fechaCard[i].anio;
         this.eventosGral[i]["numeroinicio"] = fechaCard[i].dia;
         this.eventosGral[i]["diainicio"] = fechaCard[i].diaSema;
         this.eventosGral[i]["mesinicio"] = fechaCard[i].mes;

         primeraFecha.push(this.convertirFecha(data[i].fechainicio));
         this.eventosGral[i]["fechainicio"] = primeraFecha[i];

         if(data[i].fechafin == "0000-00-00"){
           this.eventosGral[i]["fechafin"] = "";
         }else{
           this.eventosGral[i]["fechafin"] = this.convertirFecha(data[i].fechafin);
         }
        }
        // console.log(segundaFecha)
        // console.log(this.eventosGral)
     });
  }

  check(total:any, estado:string, municipio:string){
    let body       : string = "&tipo=" + total + "&fecha=" + this.currentDate + "&estado=" + estado + "&municipio=" + municipio,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = this.baseURL;

    return this.http.post(url, body, options).map(res => res.json())
  }

  fechaPreview(fecha) {
    //let fecha = "2018-05-03";
    let nuevaFecha = new Date(fecha + " ");
    let diaSemana = nuevaFecha.getDay();
    let anio = nuevaFecha.getFullYear();
    let dia = nuevaFecha.getDate();
    let mes = nuevaFecha.getMonth();
    let fecha_convertida = {  diaSema: this.diaName[diaSemana],
      anio: anio,
      dia: dia,
      mes: this.mesNames[mes]
    };
    // this.diaName[diaSemana] + " " + dia + " de " + this.mesNames[mes] + " de " + anio;
    return fecha_convertida;
  }

  convertirFecha(fecha){
    let nuevaFecha = new Date(fecha + " ");
    let diaSemana = nuevaFecha.getDay();
    let anio = nuevaFecha.getFullYear();
    let dia = nuevaFecha.getDate();
    let mes = nuevaFecha.getMonth();
    let fecha_convertida = this.diaNombre[diaSemana] + " " + dia + " de " + this.mesNombres[mes] + " de " + anio;
    return fecha_convertida;
  }

  evtCategorias(){

    this.http.get(this.baseURL2)
    .map(res => res.json())
    .subscribe(data =>
    {
      this.categorias = data;
      // console.log(this.categorias)

    });
  }

  evtsHoy(estado:string, municipio:string){

    let body       : string = "&fecha=" + this.currentDate + "&estado=" + estado + "&municipio=" + municipio,
         type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
         headers    : any     = new Headers({ 'Content-Type': type}),
         options    : any     = new RequestOptions({ headers: headers }),
         url        : any     = this.baseURL3;

     this.http.post(url, body, options).map(res => res.json())
     .subscribe(data =>
     {
        this.eventosActuales = data;
        let fechaCard:any = [];
        let primeraFecha:any = [];
        for (let i = 0; i < data.length; i++) {
          fechaCard.push(this.fechaPreview(data[i].fechainicio));
          this.eventosActuales[i]["anioinicio"] = fechaCard[i].anio;
          this.eventosActuales[i]["numeroinicio"] = fechaCard[i].dia;
          this.eventosActuales[i]["diainicio"] = fechaCard[i].diaSema;
          this.eventosActuales[i]["mesinicio"] = fechaCard[i].mes;

          primeraFecha.push(this.convertirFecha(data[i].fechainicio));
          this.eventosActuales[i]["fechainicio"] = primeraFecha[i];

          if(data[i].fechafin == "0000-00-00"){
            this.eventosActuales[i]["fechafin"] = "";
          }else{
            this.eventosActuales[i]["fechafin"] = this.convertirFecha(data[i].fechafin);
          }
         }

        // console.log(this.eventosActuales)
     });
  }

}
