import React, { Component, RefObject } from 'react';
import { debounce } from 'lodash';
import { withAlert, AlertManager } from 'react-alert';
// @ts-ignore
import MapGL, { GeolocateControl, NavigationControl, InteractiveMap, Marker } from 'react-map-gl';
// @ts-ignore
import Geocoder from 'react-map-gl-geocoder';

import getBbox from '../../utils/getBbox';

import styles from './MyMap.module.scss';

import MarkerButton from 'components/MarkerButton';

const ACCESS_TOKEN ='pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';
const PAGES_RESOURCE = '/_api/heritage/?action=search&format=json&bbox=';

class MyMap extends Component<{ alert: AlertManager }> {
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
    loading: false,
  };

  abortController: { abort: () => void, signal: any } | undefined = undefined;

  mapRef: RefObject<InteractiveMap> = React.createRef();

  loadPointsWithDebounce = debounce((bbox) => {
    this.loadPoints(bbox);
  }, 1000);

  componentWillUnmount() {
    if (this.abortController) this.abortController.abort();
  }

  handleGeolocateViewportChange = (viewport: any) => {
    const { longitude, latitude, width, height, zoom } = viewport;
    const bbox = getBbox({ longitude, latitude, width, height, zoom: Math.max(12, zoom) });

    this.setState({ viewport, zoom: Math.max(12, zoom) });

    this.loadPointsWithDebounce(bbox);
  }

  handleViewportChange = (viewport: any) => {
    this.setState({ viewport });
  }

  handleResult = async (result: { result: { bbox: [number] }}) => {
    this.loadPointsWithDebounce(result.result.bbox);
  }

  loadPoints = async (bbox: Number[]) => {
    if (this.abortController) this.abortController.abort();
    if (typeof window.AbortController === 'function') {
      this.abortController = new window.AbortController();
    }

    this.setState({ loading: true });

    try {
      const response = await fetch(
        PAGES_RESOURCE + bbox.map(item => String(item).substr(0, 7)).join(),
        {
          signal: this.abortController ? this.abortController.signal : undefined,
        }
      );

      const { monuments } = await response.json();

      this.setState({ monuments: monuments || [] });

      if (!monuments || monuments.length === 0) {
        this.props.alert.show('Достопримечательности не найдены');
      }
    } catch(err) {
      this.props.alert.error('Что-то пошло не так');
    } finally {
      this.setState({ loading: false });
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
        onViewportChange={this.handleGeolocateViewportChange}
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
          onViewportChange={this.handleGeolocateViewportChange}
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

        {this.state.loading && (
          <div className={styles.loading}>Загрузка...</div>
        )}
      </MapGL>
    );
  }
}

export default withAlert()(MyMap);
