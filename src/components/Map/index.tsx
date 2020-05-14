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
      latitude: 56.80714671197797,
      longitude: 43.20772047711302,
      zoom: 14,
      bearing: 0,
      pitch: 0
    },
    searchValue: '',
    monuments: [],
  };

  mapRef: RefObject<InteractiveMap> = React.createRef();

  handleViewportChange = (viewport: any) => {
    this.setState({viewport});
  }

  handleResult = async (result: { result: { bbox: [number] }}) => {
    console.log(result)
    try {
      const response = await fetch(PAGES_RESOURCE + result.result.bbox.join());
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
        mapStyle="mapbox://styles/mapbox/streets-v11"
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
        <div className={styles.controls}>
          <GeolocateControl
            style={{ marginBottom: '10px' }}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
          />
          <NavigationControl showCompass={false} />

          {this.state.monuments.map((item: { id: string, lon: number, lat: number, name: string }) => (
            <Marker
              key={item.id}
              longitude={item.lon}
              latitude={item.lat}
            >
              <svg height="24" width="24" viewBox="0 0 24 24" fill="#d00" stroke="none">
                <path d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9C20.1,15.8,20.2,15.8,20.2,15.7z" />
              </svg>

              <span>{item.name}</span>
            </Marker>
          ))}
        </div>
      </MapGL>
    );
  }
}

export default MyMap;
