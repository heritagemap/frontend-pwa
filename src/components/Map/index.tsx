import React, { Component, RefObject } from 'react';
// @ts-ignore
import MapGL, { GeolocateControl, NavigationControl, InteractiveMap, Marker } from 'react-map-gl';
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder';

import styles from './MyMap.module.scss';

const ACCESS_TOKEN ='pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';
const PAGES_RESOURCE = '/_api/heritage/?action=search&format=json&bbox=';

class MyMap extends Component {
  state = {
    viewport: {
      latitude: 56.6403,
      longitude: 43.3865,
      zoom: 10,
      bearing: 0,
      pitch: 0
    },
    searchValue: '',
    monuments: [],
  };

  mapRef: RefObject<InteractiveMap> = React.createRef();

  handleViewportChange = (viewport: any) => {
    this.setState({ viewport });
  }

  handleResult = async (result: { result: { bbox: [number] }}) => {
    try {
      const response = await fetch(PAGES_RESOURCE + result.result.bbox.map(item => String(item).substr(0, 7)).join());
      const { monuments } = await response.json();

       console.log(monuments);

      this.setState({ monuments: monuments || [] });

    } catch(err) {

    }
  }

  render() {
    return (
      // @ts-ignore
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={ACCESS_TOKEN}
        onViewportChange={this.handleViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Geocoder
          mapRef={this.mapRef}
          mapboxApiAccessToken={ACCESS_TOKEN}
          inputValue={this.state.searchValue}
          placeholder="Поиск"
          countries="ru"
          language="ru"
          onViewportChange={this.handleViewportChange}
          onResult={this.handleResult}
        />

        <GeolocateControl
          className={styles.geolocateControl}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <NavigationControl
          showCompass={false}
          className={styles.navigationControl}
        />

        {this.state.monuments.map((item: { id: string, lon: number, lat: number, name: string }) => (
          <Marker
            key={item.id}
            longitude={item.lon}
            latitude={item.lat}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384.2 384.2" width="20" height="20">
              <path d="M320.1 144c0-70.72-57.28-128-128-128s-128 57.28-128 128 128 216 128 216 128-145.28 128-216zm-184-.08c0-30.96 25.04-56 56-56s56 25.04 56 56-25.04 56-56 56-56-25.04-56-56z" fill="#cce4ff"/>
              <g fill="#007aff">
                <path d="M264.1 143.92c0-39.696-32.296-72-72-72s-72 32.304-72 72 32.296 72 72 72 72-32.296 72-72zm-112 0c0-22.056 17.944-40 40-40s40 17.944 40 40-17.944 40-40 40-40-17.944-40-40z"/>
                <path d="M192.1 384.2l12.008-13.624C217.612 355.24 336.1 218.608 336.1 144c0-79.4-64.6-144-144-144s-144 64.6-144 144c0 74.608 118.488 211.24 131.992 226.576L192.1 384.2zm0-352.2c61.76 0 112 50.24 112 112 0 47.648-72.32 143.968-112 191.4-39.68-47.432-112-143.752-112-191.4 0-61.76 50.24-112 112-112z"/>
              </g>
            </svg>

            <span>{item.name}</span>
          </Marker>
        ))}
      </MapGL>
    );
  }
}

export default MyMap;
