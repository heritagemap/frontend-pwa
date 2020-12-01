interface RouteParamsInterface {
  lat?: string | number;
  lon?: string | number;
  id?: string | number;
}

export default function(params: RouteParamsInterface) {
  // @ts-ignore
  return Object.keys(params).reduce((acc: string, item: 'lat' | 'lon' | 'id') => {
    if (item === 'id') return acc + `/${params[item]}`;
    return acc + `/${item}/${params[item]}`;
  }, '');
}
