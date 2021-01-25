export interface FileInterface {
  name: string;
  urls: {
    file: string;
  };
  author: string;
  date: string;
}

export enum Type {
  'architecture',
  'history',
  'archeology',
  'monument',
  'settlement',
}

export interface InfoInterface {
  knid: string;
  type: Type;
  status?: string;
  precise?: string;
  year: string;
  description: string;
  author: string;
  protection?: 'Ф' | 'Р' | 'М' | 'В';
  knid_new?: string;
  style?: string;
  wiki?: string;
  sobory?: string;
  temples?: string;
  link?: string;
  linkextra?: string;
  address?: string;
  name: string;
  image?: string;
  region?: string;
  municipality?: string;
  district?: string;
  long: number;
  lat: number;
}
