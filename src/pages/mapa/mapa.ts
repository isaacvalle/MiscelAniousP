import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, GoogleMapsAnimation, MyLocation, MyLocationOptions, Polyline, PolylineOptions, ILatLng } from '@ionic-native/google-maps';

import {NegocioProvider} from '../../providers/negocio/negocio';


@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  informacion:any = {};
  mapReady: boolean = false;
  map: GoogleMap;
  origin:string = "";
  destination:string;

  latitud:number;
  longitud:number;

  checkUbicacion:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public toastCtrl:ToastController, private _np:NegocioProvider) {
    this.informacion = this.navParams.get("datosnegocio");

    this.latitud = Number(this.informacion.lat);
    this.longitud = Number(this.informacion.lng);

    this.destination = this.informacion.lat+","+this.informacion.lng;
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {


    let mapOptions: GoogleMapOptions = {

      camera: {
        target: {
          lat: this.latitud,
          lng: this.longitud
        },
        zoom: 16,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        //console.log('Map is ready!');
        this.mapReady = true;
        // Now you can use all methods safely.
        this.map.addMarker({
            title: this.informacion.negocio,
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: this.latitud,
              lng: this.longitud
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                this.alerta();
              });
          });
      });

  }


  onButtonClick() {

      this.checkUbicacion = true;

      if (!this.mapReady) {
        this.showToast('map is not ready yet. Please try again.');
        return;
      }

      this.map.setOptions({
        controls: {
          myLocationButton: true,
          myLocation: true
        }
      });


      // Get the location of you
      let options: MyLocationOptions = {
        enableHighAccuracy: true
      };


      this.map.getMyLocation(options)
        .then((location: MyLocation) => {
          //console.log(JSON.stringify(location, null ,2));

          this.origin = location.latLng.lat.toString() + "," + location.latLng.lng.toString();

          this._np.directionsServer(this.origin, this.destination);

          // Move the map camera to the location with animation
          return this.map.animateCamera({
            target: [
              location.latLng,
              {lat: this.latitud,lng: this.longitud}
            ],
            zoom: 16,
            tilt: 30
          })
        }, error => this.alertUbication() );


  }


  showToast(message: string) {
     let toast = this.toastCtrl.create({
       message: message,
       duration: 2000,
       position: 'middle'
     });

     toast.present(toast);
   }



   getDirections(){
     var encoded = this._np.ruta;

     var path:ILatLng[] = [];
     var index = 0, len = encoded.length;
     var lat = 0, lng = 0;

     while (index < len) {
         var b, shift = 0, result = 0;

         do {
             b = encoded.charCodeAt(index++) - 63;
             result = result | ((b & 0x1f) << shift);
             shift += 5;
         } while (b >= 0x20);

         var dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
         lat += dlat;

         shift = 0;
         result = 0;

         do {
             b = encoded.charCodeAt(index++) - 63;
             result = result | ((b & 0x1f) << shift);
             shift += 5;
         } while (b >= 0x20);

         var dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
         lng += dlng;

         var p:ILatLng = {
             lat: lat / 1e5,
             lng: lng / 1e5,
         };
         path.push(p);
     }
       //console.log(path)
       let pos = path[0];
       //console.log(pos)

      let options: PolylineOptions = {
        points: path,
        color: '#0D70B5',
        width: 10,
        geodesic: true,
        clickable: true
      };

      this.map.addPolyline(options).then((polyline: Polyline) => {

      }).then(() => {
        // add a marker
        return this.map.addMarker({
          position: pos,
          icon: 'blue',
          animation: GoogleMapsAnimation.BOUNCE
        });
      });
   }


   alerta(){
     this.alertCtrl.create({
           title: this.informacion.negocio,
           subTitle: this.informacion.horario,
           buttons: ["Ok"]
     }).present();
     return;
   }

   alertUbication(){
     this.toastCtrl.create({
       message: 'Al parecer no has activado tu ubicación. Por favor verifica que tengas activada la ubicación de tu dispositivo móvil.',
       position: 'middle',
       showCloseButton: true,
       closeButtonText: 'Ok'
     }).present();
   }

}
