import React, { Component } from 'react';
import { debounce } from 'lodash';
import { withAlert } from 'react-alert';
import { withRouter } from 'react-router-dom';

import MapGL, {
  Marker,
  GeolocateControl,
  NavigationControl,
} from '@urbica/react-map-gl';
import Cluster from '@urbica/react-map-gl-cluster';
import 'mapbox-gl/dist/mapbox-gl.css';

import Geocoder from 'react-map-gl-geocoder';

import MonumentInterface from 'interfaces/Monument';
import {
  MapParamsInterface,
  MapPropsInterface,
  MyMapParams,
  CoordsInterface,
} from 'interfaces/Map';
import getBbox from 'utils/getBbox';
import getRoute from 'utils/getRoute';
import {
  ACCESS_TOKEN,
  PAGES_RESOURCE,
  MIN_ZOOM_LEVEL,
} from 'constants/map';

import getSortedMonumentsByCoords from 'utils/getSortedMonumentsByCoords';

import MarkerButton from 'components/MarkerButton';

import styles from './MyMap.module.scss';
import ClusterMarker, { Cluster as clusterInterface } from './ClusterMarker';

class MyMap extends Component<MapPropsInterface, MyMapParams> {
  loadPointsWithDebounce = debounce((mapParams: MapParamsInterface) => {
    this.loadPoints(mapParams);
  }, 1000);

  abortController: { abort: () => void; signal: any } | undefined = undefined;

  mapRef = React.createRef();

  sourceRef = React.createRef();

  cluster = React.createRef();

  constructor(props: MapPropsInterface) {
    super(props);

    const { lat, lon } = this.props.match.params;

    this.state = {
      viewport: {
        latitude: lat,
        longitude: lon,
        zoom: 15,
        bearing: 0,
        pitch: 0,
        width: undefined,
        height: undefined,
      },
      searchValue: '',
      monuments: [],
      loading: false,
    };
  }

  componentDidUpdate(prevProps: MapPropsInterface, prevState: MyMapParams) {
    if (this.props.match.params.lat !== this.state.viewport.latitude) {
      this.handleGeolocateViewportChange({
        ...this.state.viewport,
        latitude: this.props.match.params.lat,
        longitude: this.props.match.params.lon,
      });
    }

    const updatedViewport = JSON.stringify(this.state.viewport);
    if (JSON.stringify(prevState.viewport) !== updatedViewport && window?.localStorage) {
      window.localStorage.setItem('viewport', updatedViewport);
    }
  }

  componentWillUnmount() {
    if (this.abortController) this.abortController.abort();
  }

  handleGeolocateViewportChange = (viewport: any) => {
    const { longitude, latitude, zoom } = viewport;
    const maxZoom = Math.max(MIN_ZOOM_LEVEL, Number(zoom));
    const { lat, lon, id } = this.props.match.params;

    this.setState((prevState) => (
      {
        viewport: {
          ...prevState.viewport,
          longitude,
          latitude,
          zoom: maxZoom,
        },
      }
    ));

    this.loadPointsWithDebounce({ latitude, longitude, zoom: maxZoom });
    if (lat !== latitude || lon !== longitude) {
      this.props.history.push(getRoute({ lat: latitude, lon: longitude, id }));
    }
  };

  handleGeolocate = ({ coords }: CoordsInterface) => {
    const { longitude, latitude } = coords;
    const { id } = this.props.match.params;
    const { zoom } = this.state.viewport;

    this.loadPointsWithDebounce({ latitude, longitude, zoom: zoom || MIN_ZOOM_LEVEL });
    this.props.history.push(getRoute({ lat: latitude, lon: longitude, id }));
  };

  handleMapLoad = () => {
    const { lon, lat } = this.props.match?.params;

    const { zoom } = this.state.viewport;

    this.loadPoints({ longitude: lon, latitude: lat, zoom: zoom || MIN_ZOOM_LEVEL });
  };

  handleClusterClick = (cluster: clusterInterface) => {
    const { clusterId, longitude, latitude } = cluster;

    // @ts-ignore
    const supercluster = this.cluster.current.getCluster();
    const zoom = supercluster.getClusterExpansionZoom(clusterId);

    this.setState((prevState: MyMapParams) => ({
      viewport: {
        ...prevState.viewport,
        latitude,
        longitude,
        zoom,
      },
    }));
  };

  loadPoints = async ({ latitude, longitude, zoom }: MapParamsInterface) => {
    if (this.abortController) this.abortController.abort();
    if (typeof window.AbortController === 'function') {
      this.abortController = new window.AbortController();
    }

    this.setState({ loading: true });

    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;

    const bbox = getBbox({
      width,
      height,
      latitude: Number(latitude),
      longitude: Number(longitude),
      zoom: Number(zoom),
    });

    try {
      const response = await fetch(
        PAGES_RESOURCE + bbox.map((item) => String(item).substr(0, 7)).join(),
        {
          signal: this.abortController
            ? this.abortController.signal
            : undefined,
        },
      );

      const { monuments } = await response.json();

      this.setState({
        monuments: getSortedMonumentsByCoords(monuments || []),
      });

      if (!monuments || monuments.length === 0) {
        this.props.alert.show('Достопримечательности не найдены');
      }
    } catch (err) {
      if (err.name === 'AbortError') return;

      this.props.alert.error('Что-то пошло не так');
      console.log(err);
    } finally {
      this.setState({ loading: false });
    }
  };

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
          trackUserLocation
          onGeolocate={this.handleGeolocate}
          onViewportChange={this.handleGeolocateViewportChange}
          label="Мое местоположение"
        />

        <NavigationControl position="top-right" showZoom />

        <Cluster
          radius={40}
          extent={512}
          nodeSize={64}
          component={(cluster: clusterInterface) => (
            <ClusterMarker onClick={this.handleClusterClick} {...cluster} />
          )}
          ref={this.cluster}
        >
          {this.state.monuments.map((group: MonumentInterface[]) => {
            if (group.length > 1) {
              return (
                group.map((item, index) => (
                  <Marker
                    key={item.id}
                    longitude={item.lon + (index % 3) / 10000}
                    latitude={item.lat - (Math.floor(index / 3)) / 15000}
                  >
                    <MarkerButton item={item} />
                  </Marker>
                ))
              );
            }

            if (group.length === 0) return null;

            return (
              <Marker key={group[0].id} longitude={group[0].lon} latitude={group[0].lat}>
                <MarkerButton item={group[0]} />
              </Marker>
            );
          })}
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
