import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs';

mapboxgl.accessToken = environment.mapsboxKey;



@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [`
    div {
      width: 100%;
      height: 260px;
    }

    #controls {
      background-color: white;
    padding: 10px;
    border-radius: 5px;
    position: fixed;
    bottom: 25px;
    right: 20px;
    z-index: 9999;
    box-shadow:0 0 10px rgba(0,0,0,0.1);
    boder: 1px solid #e2e8f0;
    width: 250px;
    }
  `]
})
export class MiniMapComponent implements AfterViewInit {
   divElement = viewChild<ElementRef>('map');
   lngLat = input.required<{lng: number, lat: number}>();
   zoom = input<number>(14)

   async ngAfterViewInit() {
       if( !this.divElement()?.nativeElement) return;

  await new Promise((resolve) => setTimeout( resolve, 80))


const element = this.divElement()!.nativeElement;


console.log(element);



  const map = new mapboxgl.Map({
    container: element, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: this.lngLat(), // starting position [lng, lat]
    zoom: this.zoom(), // starting zoom
    interactive: false, // disable user interactions
    pitch: 50, //  pitch
    bearing: 90, //  bearing


});
new mapboxgl.Marker().setLngLat(this.lngLat()).addTo(map);
   }

  }



