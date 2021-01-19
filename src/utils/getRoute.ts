interface RouteParamsInterface {
  lat?: string | number;
  lon?: string | number;
  id?: string | number;
}

const getRoute = (params: RouteParamsInterface) => (
  Object.keys(params).reduce(
    // @ts-ignore
    (acc: string, item: 'lat' | 'lon' | 'id') => {
      if (!params[item]) return acc;

      if (item === 'id') return `${acc}/${params[item]}`;
      return `${acc}/${item}/${params[item]}`;
    },
    '',
  )
);

export default getRoute;
