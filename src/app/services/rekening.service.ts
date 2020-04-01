import { Injectable } from '@angular/core';
import { Rekening } from '../models/Rekening';
import { Observable, from, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class RekeningService {

  public rekeningg : Rekening;

  title = 'Rekening Service';
  url= 'https://services7.arcgis.com/21GdwfcLrnTpiju8/arcgis/rest/services/Sierende_elementen/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json';  
  constructor(public rekening: Rekening) { 
    console.log("RekeningService created()");
    //this.rekeningg = rekening;
  }

  getModelsSync() {
    return this.title;
  }

}
