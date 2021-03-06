// https://gist.github.com/pianosnake/b4a45ef6bdf2ffb2e1b44bbcca107298

const EARTH_CIR_METERS = 40075016.686;
const degreesPerMeter = 360 / EARTH_CIR_METERS;

interface BboxParams {
  latitude: number,
  longitude: number,
  zoom: number,
  width: number,
  height: number,
}

function toRadians(degrees: number) {
  return (degrees * Math.PI) / 180;
}

// @ts-ignore
const getBbox = ({
  latitude, longitude, zoom, width, height,
}: BboxParams) => {
  const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
  // eslint-disable-next-line max-len
  const metersPerPixelNS = (EARTH_CIR_METERS / Math.pow(2, zoom + 8)) * Math.cos(toRadians(latitude));

  const shiftMetersEW = (width / 2) * metersPerPixelEW;
  const shiftMetersNS = (height / 2) * metersPerPixelNS;

  const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
  const shiftDegreesNS = shiftMetersNS * degreesPerMeter;

  const west = longitude - shiftDegreesEW < -180 ? -180 : longitude - shiftDegreesEW;
  const south = latitude - shiftDegreesNS < -90 ? -90 : latitude - shiftDegreesNS;
  const east = longitude + shiftDegreesEW > 180 ? 180 : longitude + shiftDegreesEW;
  const north = latitude + shiftDegreesNS > 90 ? 90 : latitude + shiftDegreesNS;

  return [west, south, east, north];
};

export default getBbox;
