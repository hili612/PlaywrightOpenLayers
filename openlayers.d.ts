import * as ol from 'ol';

declare global {
  interface Window {
    map: ol.Map;
  }
}