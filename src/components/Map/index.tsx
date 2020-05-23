import React, { Component, RefObject } from 'react';
// @ts-ignore
import MapGL, { GeolocateControl, NavigationControl, InteractiveMap, Marker } from 'react-map-gl';
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder';

import getBbox from '../../utils/getBbox';

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

  abortController: { abort: () => void, signal: any } | undefined = undefined;

  mapRef: RefObject<InteractiveMap> = React.createRef();

  componentWillUnmount() {
    if (this.abortController) this.abortController.abort();
  }

  loadPoints = async (viewport: any) => {
    this.setState({ viewport });

    const { longitude, latitude, width, height } = viewport;
    const bbox = getBbox({ longitude, latitude, width, height, zoom: 10 });

    console.log('bbox', bbox);
    this.setState({ viewport, zoom: 10 });

    if (this.abortController) this.abortController.abort();
    if (typeof window.AbortController === 'function') {
      this.abortController = new window.AbortController();
    }

    try {
      const response = await fetch(
        PAGES_RESOURCE + bbox.map(item => String(item).substr(0, 7)).join(),
        {
          signal: this.abortController ? this.abortController.signal : undefined,
        }
      );

      const { monuments } = await response.json();

      console.log(monuments);

      this.setState({ monuments: monuments || [] });

    } catch(err) {

    }
  }

  handleViewportChange = (viewport: any) => {
    this.setState({ viewport });
  }

  handleResult = async (result: { result: { bbox: [number] }}) => {

    console.log(result.result.bbox)
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
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapboxApiAccessToken={ACCESS_TOKEN}
        onViewportChange={this.loadPoints}
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
          onViewportChange={this.loadPoints}
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
