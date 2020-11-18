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
