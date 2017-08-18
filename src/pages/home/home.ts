import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ActivePage } from '../active/active';
import { Geolocation } from '@ionic-native/geolocation';
import { SMS } from '@ionic-native/sms';
import { Geofence } from '@ionic-native/geofence';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  radius: number = 100
  error: any
  success: any

  constructor(
    public navCtrl: NavController,
    private platform: Platform,
    private geolocation: Geolocation,
    private geofance: Geofence,
    private sms: SMS
  ) {

    this.platform.ready().then(() => {
      geofance.initialize().then(
        () => console.log('Geofance plugin ready'),
        (err) => console.log(err)
      )   
    })
  }

  setGeofence(value: number) {
    this.geolocation.getCurrentPosition({
      enableHighAccuracy: true
    }).then((resp) => {
      let longitude = resp.coords.longitude;
      let latitude = resp.coords.latitude;
      let raduis = value;
      let fence = {
        id: "myGeofenceID1",
        latitude: latitude,
        longitude: longitude,
        raduis: raduis,
        transitionType: 2
      }

      this.geofance.addOrUpdate(fence).then(
        () => this.success = true,
        (err) => this.error = "Failed to add or update the fence."        
      )

      this.geofance.onTransitionReceived().subscribe(resp => {
        this.sms.send('5512981057742', 'She left the damn fence!')
      })

      this.navCtrl.push(ActivePage);
    }).catch((error) => {
      this.error = error
    })
  }
}
