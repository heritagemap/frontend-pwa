import React, { Component, RefObject } from 'react';
// @ts-ignore
import MapGL, { GeolocateControl, NavigationControl, InteractiveMap, Marker } from 'react-map-gl';
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder';

import styles from './MyMap.module.scss';

import MarkerButton from 'components/MarkerButton';

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

        {this.state.monuments.map((item: { id: string, lon: number, lat: number, name: string, address: string }) => (
          <Marker
            key={item.id}
            longitude={item.lon}
            latitude={item.lat}
          >
            <MarkerButton item={item} />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

export default MyMap;
