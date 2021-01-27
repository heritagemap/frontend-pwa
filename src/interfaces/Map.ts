import { AlertManager } from 'react-alert';
import MonumentIntarface from './Monument';

export interface ViewportInterface {
  latitude?: number | string,
  longitude?: number | string,
  zoom?: number,
  bearing?: number,
  pitch?: number,
  width?: number,
  height?: number,
}

export interface MapParamsInterface {
  latitude: number | string;
  longitude: number | string;
  zoom: number | string;
}

export interface MapPropsInterface {
  alert: AlertManager,
  match: {
    params: { lat: string; lon: string; id?: string }
  },
  history: { push: (route: string) => void },
}

export interface MyMapParams {
  viewport: ViewportInterface;
  searchValue: string;
  monuments: MonumentIntarface[][];
  loading: boolean;
}

export interface CoordsInterface {
  coords: {
    latitude: number;
    longitude: number;
  };
}
