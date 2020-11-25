import REGIONS from 'constants/regions';

interface ParamsInterface {
  region?: string,
  municipality?: string,
  district?: string
};

export const SOURCE = `https://ru.wikivoyage.org/wiki/Культурное_наследие_России`;

export default function({ region, municipality, district }: ParamsInterface) {
  if (!region) return SOURCE;
  // @ts-ignore
  return SOURCE + '/' + REGIONS[region] + '/' + (municipality || district)
}
