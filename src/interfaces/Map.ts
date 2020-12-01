import { AlertManager } from 'react-alert';

export interface ViewportInterface {
  latitude?: number,
  longitude?: number,
  zoom?: number,
  bearing?: number,
  pitch?: number,
  width?: number,
  height?: number,
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
  monuments: [];
  loading: boolean;
}
