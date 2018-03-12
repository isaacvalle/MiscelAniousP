import {Http, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

import {URL_SERVICIOS} from '../../config/url.servicios';

import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  public hideForm               : boolean = false;
  private baseURI               : string  = "http://192.168.0.116/VirtPointserver/";

  public items:any = [];

  token:string;
  id_usuario:string;
  nombre:string;

  constructor(public http: Http,
              public alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private platform:Platform,
              private storage: Storage) {

      this.cargar_storage();

  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }




  ingresar(usuario:string, contrasena:string){


    let data = new URLSearchParams();
    data.append("username", usuario);
    data.append("contrasena", contrasena);

    let url = URL_SERVICIOS +"/login";

    return this.http.post(url, data).map(resp=>{
      let data_rest = resp.json();
      console.log(data_rest);

      if(data_rest.error){

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

        console.log(this.id_usuario);
        console.log(this.nombre);
        console.log(this.token);

        //Guardar storage
        this.guardar_storage();
        this.mostrar_loading();




        //Guardar storage




      }
    });


  /*  console.log("Datos del usuario: " + usuario, contrasena);
    this.datosIngreso(usuario, contrasena);
  }


  datosIngreso(usuario, contrasena){

    let body       : string = "&usuario=" + usuario + "&contrasena=" + contrasena,
        type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
        headers    : any     = new Headers({ 'Content-Type': type}),
        options    : any     = new RequestOptions({ headers: headers }),
        url        : any     = this.baseURI + "login.php";

    this.http.post(url, body, options).map(res => res.json())
    .subscribe(data =>
    {
      this.items = data

      if(this.items==""){
        console.log("NO HAY DATOS");
      }else{

        for(let item of this.items){
          console.log(item);
        }
      }



    });*/
}











  registrar(nombre, email, usuario, contrasena){
    console.log("Datos del usuario: " + nombre, email, usuario, contrasena);
    this.dateEntry(nombre, email, usuario, contrasena);
  }


  dateEntry(nombre, email, usuario, contrasena){
  let body       : string = "&nombre=" + nombre + "&email=" + email + "&usuario=" + usuario + "&contrasena=" + contrasena,
      type       : string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers    : any     = new Headers({ 'Content-Type': type}),
      options    : any     = new RequestOptions({ headers: headers }),
      url        : any     = this.baseURI + "registro.php";

  this.http.post(url, body, options)
  .subscribe(data =>
  {
     // If the request was successful notify the user
     if(data.status === 200){
        this.hideForm  =  true;
        //this.sendNotification(`Congratulations: ${id} was successfully updated`);
        this.sendNotification(`Instruccion ejecutada`, email);
     }
     // Otherwise let 'em know anyway
     else
     {
        this.sendNotification('Something went wrong!', email);
     }
  });
}


  sendNotification(message, email){

    this.alertCtrl.create({
          title:"¡Exito!",
          subTitle: "Por favor revisa la bandeja de entrada de su correo electronico " + email + " para verificar la cuenta",
          buttons: ["Ok"]
    }).present();

    return;

    }






    private guardar_storage(){
      if(this.platform.is("cordova")){
        //Estamos en el dispositivo
        this.storage.set('token', this.token);
        this.storage.set('id_usuario', this.id_usuario);
        this.storage.set('nombre', this.nombre);
      }
      else{
        //Estamos en la computadora
        if(this.token){
            localStorage.setItem("token", this.token);
            localStorage.setItem("id_usuario", this.id_usuario);
            localStorage.setItem("nombre", this.nombre);


        }else{
          localStorage.removeItem("token");
          localStorage.removeItem("id_usuario");
          localStorage.removeItem("nombre");



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
                resolve();
              })


        })

        }
        else{
          //Estamos en la computadora
          if(localStorage.getItem("token")){
            //Exite items en el localstorage
            this.token = localStorage.getItem("token");
            this.id_usuario = localStorage.getItem("id_usuario");
            this.nombre = localStorage.getItem("nombre");
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




}
