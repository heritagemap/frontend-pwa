interface RouteParamsInterface {
  lat?: string | number;
  lon?: string | number;
  id?: string | number;
  zoom?: string | number;
}

const getRoute = (params: RouteParamsInterface) => (
  ['lat', 'lon', 'zoom', 'id'].reduce(
    // @ts-ignore
    (acc: string, item: 'lat' | 'lon' | 'id' | 'zoom') => {
      if (!params[item]) return acc;

      if (item === 'id') return `${acc}/${params[item]}`;
      return `${acc}/${item}/${params[item]}`;
    },
    '',
  )
);

export default getRoute;
