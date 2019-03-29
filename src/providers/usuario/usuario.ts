import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {URL_SERVICIOS} from '../../config/url.servicios';

import {URL_VIRTSERVER} from '../../config/url.servicios';

import { Storage } from '@ionic/storage';

import { Vibration } from '@ionic-native/vibration';


@Injectable()
export class UsuarioProvider {

  public hideForm               : boolean = false;


  public items:any = [];

  token:string;
  id_usuario:string;
  nombre:string;
  estado:string;
  municipio:string;
  codigo:string;

  val:any = [];
  val2:any = [];

  constructor(public http: Http,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private platform:Platform,
              private storage: Storage,
              private vibration: Vibration) {

      this.cargar_storage();

  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  ingresar(correo:string, contrasena:string){

    let data = new URLSearchParams();
    data.append("correo", correo);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS +"/login";

    return this.http.post(url, data).map(resp=>{
      let data_rest = resp.json();

      if(data_rest.error){

        if(this.platform.is("cordova")){
          this.vibration.vibrate(1000);
        }

        this.alertCtrl.create({
          title:"Error al iniciar",
          subTitle: data_rest.mensaje,
          buttons: ["Ok"]
        }).present();

      }
      else{

        this.token = data_rest.token;
        this.id_usuario = data_rest.id_usuario;
        this.nombre = data_rest.nombre;
        this.estado = data_rest.estado;
        this.codigo = data_rest.codigo;
        this.municipio = 'vacio';

        //Guardar storage
        this.guardar_storage();
        this.mostrar_loading();
      }
    });
  }


  registrar(nombre, email, usuario, contrasena, telefono, estado, municipio, codigo){
    this.dateEntry(nombre, email, usuario, contrasena, telefono, estado, municipio, codigo);
  }

  dateEntry(nombre, email, usuario, contrasena, telefono, estado, municipio, codigo){
    let body       : string = "&nombre=" + nombre + "&email=" + email + "&usuario=" + usuario + "&contrasena=" + contrasena + "&telefono=" + telefono + "&estado=" + estado + "&municipio=" + municipio + "&codigo=" + codigo,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = URL_VIRTSERVER + "registroconVerificar.php";

    this.http.post(url, body, options)
    .subscribe(data =>
    {

      this.val = data;
       // If the request was successful notify the user
       if(this.val._body === ""){
          this.hideForm  =  true;
          this.sendNotification(email);
       }else{
         this.sendNotificationError(email);
       }
    });
  }

  sendNotification(email){

    this.alertCtrl.create({
          title:"¡Exito!",
          subTitle: "Por favor revisa la bandeja de entrada de su correo electrónico: " + email + " para verificar la cuenta. Esto puede demorar de 5 a 10 minutos",
          buttons: ["Ok"]
    }).present();

    return;

  }

    sendNotificationError(email){

      this.alertCtrl.create({
            title:"ERROR",
            subTitle: "El correo electrónico: " + email + " ya existe en la base de datos, por favor ingrese otro diferente",
            buttons: ["Ok"]
      }).present();

      return;

    }

    guardar_storage(){
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        this.storage.set('token', this.token);
        this.storage.set('id_usuario', this.id_usuario);
        this.storage.set('nombre', this.nombre);
        this.storage.set('estado', this.estado);
        this.storage.set('municipio', this.municipio);
        this.storage.set('codigo', this.codigo);

      }else{
        //Estamos en la computadora
        if(this.token){
            localStorage.setItem("token", this.token);
            localStorage.setItem("id_usuario", this.id_usuario);
            localStorage.setItem("nombre", this.nombre);
            localStorage.setItem("estado", this.estado);
            localStorage.setItem("municipio", this.municipio);
            localStorage.setItem("codigo", this.codigo);

        }else{
          localStorage.removeItem("token");
          localStorage.removeItem("id_usuario");
          localStorage.removeItem("nombre");
          localStorage.removeItem("estado");
          localStorage.removeItem("municipio");
          localStorage.removeItem("codigo");
        }
      }
    }

    cargar_storage(){
      let promesa = new Promise((resolve, reject)=>{
        if(this.platform.is("cordova")){
          //Estamos en el dispositivo
          this.storage.ready().then(()=>{
              this.storage.get("token").then(token=>{
                if(token){
                  this.token = token;
                }
              })

              this.storage.get("id_usuario").then(id_usuario=>{
                if(id_usuario){
                  this.id_usuario = id_usuario;
                }
              })

              this.storage.get("nombre").then(nombre=>{
                if(nombre){
                  this.nombre = nombre;
                }
              })

              this.storage.get("estado").then(estado=>{
                if(estado){
                  this.estado = estado;
                }
              })

              this.storage.get("municipio").then(municipio=>{
                if(municipio){
                  this.municipio = municipio;
                }
              })

              this.storage.get("codigo").then(codigo=>{
                if(codigo){
                  this.codigo = codigo;
                }
                resolve();
              })

        })

        }else{
          //Estamos en la computadora
          if(localStorage.getItem("token")){
            //Exite items en el localstorage
            this.token = localStorage.getItem("token");
            this.id_usuario = localStorage.getItem("id_usuario");
            this.nombre = localStorage.getItem("nombre");
            this.estado = localStorage.getItem("estado");
            this.municipio = localStorage.getItem("municipio");
            this.codigo = localStorage.getItem("codigo");
          }
          resolve();
        }
      });
      return promesa;

    }

    mostrar_loading(){
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        spinner: "crescent",
        duration: 2000
      });
      loader.present();
    }

    logOut(){
      this.id_usuario = null;
      this.token = null;
      this.nombre = null;
      this.estado = null;
      this.municipio = null;
      this.codigo = null;

      this.guardar_storage();
    }

    cambiarpass(email, contrasena){

      let body       : string = "&email=" + email + "&contrasena=" + contrasena,
          type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
          headers    : any     = new Headers({ 'Content-Type': type}),
          options    : any     = new RequestOptions({ headers: headers }),
          url        : any     = URL_VIRTSERVER + "cambiarPassword.php";

      this.http.post(url, body, options).subscribe(data =>{

          this.val2 = data;
           // If the request was successful notify the user
           if(this.val2._body === ""){
              this.hideForm  =  true;
               this.mostrarAlerta(email);

           }else{
             this.mostrarAlertaError(email);
           }
        });
      }

      mostrarAlerta(email){

        this.alertCtrl.create({
              title:"¡Exito!",
              subTitle: "Por favor revisa la bandeja de entrada de su correo electrónico: " + email + " para acceptar el cambio de contraseña. Esto puede demorar de 5 a 10 minutos",
              buttons: ["Ok"]
        }).present();

        return;

      }

      mostrarAlertaError(email){
          this.alertCtrl.create({
                title:"ERROR",
                subTitle: "El correo electrónico: " + email + " no existe en la base de datos",
                buttons: ["Ok"]
          }).present();

          return;
        }

}
