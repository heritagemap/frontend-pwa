import React, { Component } from 'react';
import { debounce } from 'lodash';
import { withAlert } from 'react-alert';

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
  ViewportInterface,
  MapPropsInterface,
  MyMapParams,
  CoordsInterface,
} from 'interfaces/Map';
import getBbox from 'utils/getBbox';

import MarkerButton from 'components/MarkerButton';

import { withRouter } from 'react-router-dom';
import getRoute from 'utils/getRoute';
import styles from './MyMap.module.scss';
import ClusterMarker, { Cluster as clusterInterface } from './ClusterMarker';

const ACCESS_TOKEN = 'pk.eyJ1IjoieXVsaWEtYXZkZWV2YSIsImEiOiJjazh0enUyOGEwNTR1M29va3I0YXMweXR5In0.6S0Dy1MTrzcgLlQEHtF2Aw';
const PAGES_RESOURCE = '/_api/heritage/?action=search&format=json&limit=5000&srcountry=ru&&props=id|name|address|municipality|lat|lon|image|source&bbox=';
const MIN_ZOOM_LEVEL = 0;

class MyMap extends Component<MapPropsInterface, MyMapParams> {
  loadPointsWithDebounce = debounce((bbox) => {
    this.loadPoints(bbox);
  }, 1000);

  abortController: { abort: () => void; signal: any } | undefined = undefined;

  mapRef = React.createRef();

  sourceRef = React.createRef();

  cluster = React.createRef();

  constructor(props: MapPropsInterface) {
    super(props);

    let prevPosition: { lat?: string, lon?: string } = {};

    const { lat, lon } = this.props.match.params;

    if (!lat && !lon) {
      try {
        prevPosition = JSON.parse(window.localStorage.getItem('viewport') || '');
      } catch (err) {
        console.log(err);
      }
    }

    this.state = {
      viewport: {
        latitude: lat || prevPosition?.lat || 55.7522,
        longitude: lon || prevPosition?.lon || 37.6155,
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

  componentDidMount() {
    const { lat, lon } = this.props.match.params;

    if (!lat || !lon) {
      this.props.history.push(
        getRoute(
          {
            lat: this.state.viewport.latitude,
            lon: this.state.viewport.longitude,
          },
        ),
      );
    }
  }

  componentDidUpdate(prevProps: MapPropsInterface, prevState: MyMapParams) {
    const updatedViewport = JSON.stringify(this.state.viewport);
    if (JSON.stringify(prevState.viewport) !== updatedViewport && window?.localStorage) {
      window.localStorage.setItem('viewport', updatedViewport);
    }
  }

  componentWillUnmount() {
    if (this.abortController) this.abortController.abort();
  }

  handleGeolocateViewportChange = (viewport: any) => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    const { longitude, latitude, zoom } = viewport;
    const maxZoom = Math.max(MIN_ZOOM_LEVEL, Number(zoom));

    const bbox = getBbox({
      longitude,
      latitude,
      width,
      height,
      zoom: maxZoom,
    });

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

    this.loadPointsWithDebounce(bbox);
    this.props.history.push(getRoute({ lat: latitude, lon: longitude }));
  };

  handleGeolocate = ({ coords }: CoordsInterface) => {
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    const { longitude, latitude } = coords;

    const bbox = getBbox({
      longitude,
      latitude,
      width,
      height,
      zoom: this.state.viewport.zoom || MIN_ZOOM_LEVEL,
    });

    this.setState((prevState) => (
      {
        viewport: {
          ...prevState.viewport,
          zoom: prevState.viewport.zoom,
          latitude,
          longitude,
        },
      }
    ));

    this.loadPointsWithDebounce(bbox);
    this.props.history.push(getRoute({ lat: latitude, lon: longitude }));
  };

  handleMapLoad = () => {
    const { lon, lat } = this.props.match?.params;
    if ((lat && lon)) {
      const width = document.body.offsetWidth;
      const height = document.body.offsetHeight;

      const { longitude, latitude, zoom } = this.state.viewport;

      const bbox = getBbox({
        longitude: Number(longitude),
        latitude: Number(latitude),
        width,
        height,
        zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)),
      });
      this.loadPoints(bbox);
      return;
    }

    navigator.geolocation.getCurrentPosition((position) => {
      if (
        !position.coords
        || !position.coords.latitude
        || !position.coords.longitude
      ) {
        this.props.alert.show('Данные по геопозиции недоступны');
        return;
      }

      const width = document.body.offsetWidth;
      const height = document.body.offsetHeight;
      const { longitude, latitude } = position.coords;
      const { zoom } = this.state.viewport;

      this.setState((prevState: { viewport: ViewportInterface }) => {
        const viewport = {
          ...prevState.viewport,
          longitude,
          latitude,
          zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)),
        };

        return { viewport };
      });

      const bbox = getBbox({
        longitude,
        latitude,
        width,
        height,
        zoom: Math.max(MIN_ZOOM_LEVEL, Number(zoom)),
      });
      this.loadPointsWithDebounce(bbox);
    });
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

  loadPoints = async (bbox: Number[]) => {
    if (this.abortController) this.abortController.abort();
    if (typeof window.AbortController === 'function') {
      this.abortController = new window.AbortController();
    }

    this.setState({ loading: true });

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

      this.setState({ monuments: monuments || [] });

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
          {this.state.monuments.map((item: MonumentInterface) => (
            <Marker key={item.id} longitude={item.lon} latitude={item.lat}>
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
