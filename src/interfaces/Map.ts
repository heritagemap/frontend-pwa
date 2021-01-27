import { AlertManager } from 'react-alert';

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
  monuments: [][];
  loading: boolean;
}

export interface CoordsInterface {
  coords: {
    latitude: number;
    longitude: number;
  };
}
