import React, { Component } from 'react';
import { debounce } from 'lodash';
import { withAlert } from 'react-alert';

import MapGL, { Marker, GeolocateControl, NavigationControl } from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';

import Geocoder from 'react-map-gl-geocoder';

import MonumentInterface from 'interfaces/Monument';
import { ViewportInterface, MapPropsInterface, MyMapParams } from 'interfaces/Map';
import getBbox from 'utils/getBbox';

import MarkerButton from 'components/MarkerButton';

import styles from './MyMap.module.scss';
import ClusterMarker, { cluster as clusterInterface } from './ClusterMarker';
import { withRouter } from 'react-router-dom';
import getRoute from 'utils/getRoute';

const ACCESS_TOKEN ='pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';
const PAGES_RESOURCE = '/_api/heritage/?action=search&format=json&limit=5000&srcountry=ru&&props=id|name|address|municipality|lat|lon|image|source&bbox=';
const MIN_ZOOM_LEVEL = 0;

class MyMap extends Component<MapPropsInterface> {
  state: MyMapParams = {
    viewport: {
      latitude: 55.7522,
      longitude: 37.6155,
      zoom: 10,
      bearing: 0,
      pitch: 0,
      width: undefined,
      height: undefined,
    },
    searchValue: '',
    monuments: [],
    loading: false,
  };

  abortController: { abort: () => void, signal: any } | undefined = undefined;

  mapRef = React.createRef();
  sourceRef = React.createRef();
  cluster = React.createRef();

  loadPointsWithDebounce = debounce((bbox) => {
    this.loadPoints(bbox);
  }, 1000);

  componentDidMount() {
    const { lat, lon } = this.props.match.params;

    if (lat && lon) {
      this.setState(
        (prevState: MyMapParams) => (
          {
            viewport: {
              ...prevState.viewport,
              latitude: lat,
              longitude: lon,
              zoom: 17, // TODO: брать пользовательский
            }
          }
        )
      );

      return;
    }

    const viewport = window.localStorage.getItem('viewport');

    if (viewport) {
      const { latitude, longitude } = JSON.parse(viewport);

      this.props.history.push(
        getRoute({ lat: latitude, lon: longitude }),
      );
    }
  }

  componentWillUnmount() {
    if (this.abortController) this.abortController.abort();
  }

  handleGeolocateViewportChange = (viewport: any) => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    const { longitude, latitude, zoom } = viewport;
    const bbox = getBbox({ longitude, latitude, width, height, zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)) });

    this.setState({ viewport, zoom: Math.max(MIN_ZOOM_LEVEL, zoom) });

    window.localStorage.setItem('viewport', JSON.stringify(viewport));

    this.loadPointsWithDebounce(bbox);
  }

  handleMapLoad = () => {
    if (window.localStorage.getItem('viewport')) {
      const width = document.body.offsetWidth;
      const height = document.body.offsetHeight;

      // @ts-ignore
      const { longitude, latitude, zoom } = JSON.parse(window.localStorage.getItem('viewport'));
      const bbox = getBbox({ longitude, latitude, width, height, zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)) });
      this.loadPoints(bbox);
      return;
    };

    navigator.geolocation.getCurrentPosition((position) => {
      if (!position.coords || !position.coords.latitude || !position.coords.longitude) {
        this.props.alert.show('Данные по геопозиции недоступны');
        return;
      }

      const width = document.body.offsetWidth;
      const height = document.body.offsetHeight;
      const { longitude, latitude } = position.coords;
      const { zoom } = this.state.viewport;

      this.setState((prevState: { viewport: ViewportInterface }) => {
        const viewport = { ...prevState.viewport, longitude, latitude, zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)) };
        window.localStorage.setItem('viewport', JSON.stringify(viewport));

        return ({ viewport });
      })

      const bbox = getBbox({ longitude, latitude, width, height, zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)) });
      this.loadPointsWithDebounce(bbox);
    });
  }

  handleClusterClick = (cluster: clusterInterface) => {
    const { clusterId, longitude, latitude } = cluster;

    // @ts-ignore
    const supercluster = this.cluster.current.getCluster();
    const zoom = supercluster.getClusterExpansionZoom(clusterId);

    this.setState((prevState: MyMapParams) => {
      return {
        viewport: {
          ...prevState.viewport,
          latitude,
          longitude,
          zoom
        }
      };
    });
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
      if (err.name === 'AbortError') return;

      this.props.alert.error('Что-то пошло не так');
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <MapGL
        ref={this.mapRef}
        {...this.state.viewport}
        dragRotate={false}
        pitch={0}
        pitchWithRotate={false}
        style={{ width: '100vw', height: '100vh' }}
        accessToken={ACCESS_TOKEN}
        onViewportChange={this.handleGeolocateViewportChange}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onLoad={this.handleMapLoad}
        touchRotate={false}
      >
        <Geocoder
          mapRef={this.mapRef}
          mapboxApiAccessToken={ACCESS_TOKEN}
          inputValue={this.state.searchValue}
          placeholder="Поиск"
          countries="ru"
          language="ru"
          onViewportChange={this.handleGeolocateViewportChange}
        />

        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          onViewportChange={this.handleGeolocateViewportChange}
          label="Мое местоположение"
        />

        <NavigationControl position='top-right' showZoom />

        <Cluster
          radius={40}
          extent={512}
          nodeSize={64}
          component={(cluster: clusterInterface) => (
            <ClusterMarker onClick={this.handleClusterClick} {...cluster} />
          )}
          ref={this.cluster}
        >
          {this.state.monuments.map((item: MonumentInterface) => (
            <Marker
              key={item.id}
              longitude={item.lon}
              latitude={item.lat}
            >
              <MarkerButton item={item} />
            </Marker>
          ))}
        </Cluster>

        {this.state.loading && (
          <div className={styles.loading}>Поиск объектов...</div>
        )}
      </MapGL>
    );
  }
}

// @ts-ignore
export default withRouter(withAlert()(MyMap));
