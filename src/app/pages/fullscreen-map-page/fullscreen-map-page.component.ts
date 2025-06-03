import { AfterViewInit, Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl';
import { environment } from '../../../environments/environment';
import { DecimalPipe, JsonPipe } from '@angular/common';


mapboxgl.accessToken = environment.mapsboxKey;

@Component({
  selector: 'app-fullscreen-map-page',
  imports: [DecimalPipe, JsonPipe],
  templateUrl: './fullscreen-map-page.component.html',
  styles: `
  div {
    width: 100vw;
    height: calc(100vh - 64px);
    background-color: red;
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
  `,

})

export class FullscreenMapPageComponent implements AfterViewInit {

  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null)

  zoom = signal(14);
  coordinates = signal({
    lng: -74.5,
    lat: 40
  })



  zoomEfefect = effect(() => {
    if (!this.map()) return;

    // this.map()?.setZoom(this.zoom());
    this.map()?.zoomTo(this.zoom())
  })

  async ngAfterViewInit() {

  if( !this.divElement()?.nativeElement) return;

  await new Promise((resolve) => setTimeout( resolve, 80))


const element = this.divElement()!.nativeElement;

const {lng, lat} = this.coordinates()
console.log(element);



  const map = new mapboxgl.Map({
    container: element, // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [lng, lat], // starting position [lng, lat]
    zoom: this.zoom(), // starting zoom
});
this.mapListeners(map)
}

mapListeners( map: mapboxgl.Map) {
map.on('zoomend', (event) => {
  const newZoom = event.target.getZoom()
  this.zoom.set(newZoom)
})
  map.on('moveend', () => {
    const center = map.getCenter();
    console.log(center);

    this.coordinates.set(center)
  })

  map.on('load', () => {
    console.log('Cargando el mapa...')
  })

  map.addControl(new mapboxgl.FullscreenControl) // Para maximizar el map
  map.addControl(new mapboxgl.NavigationControl) // Para la navegación del mapa
  map.addControl(new mapboxgl.ScaleControl)      // Para ver las escalas del mapa
  map.addControl(new mapboxgl.AttributionControl) //
  map.addControl(new mapboxgl.GeolocateControl)
  


  this.map.set(map);
  }
}
