import { Component } from '@angular/core'
import { NavController, NavParams } from 'ionic-angular'
import { Geofence } from '@ionic-native/geofence'
import { HomePage } from '../home/home'

@Component({
  selector: 'page-active',
  templateUrl: 'active.html',
})

export class ActivePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private geofance: Geofence
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivePage');
  }

  removeFence() {
    this.geofance.removeAll()
    this.navCtrl.push(HomePage)
  }

}
