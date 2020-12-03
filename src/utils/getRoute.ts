interface RouteParamsInterface {
  lat?: string | number;
  lon?: string | number;
  id?: string | number;
}

const getRoute = (params: RouteParamsInterface) => (
  // @ts-ignore
  Object.keys(params).reduce(
    (acc: string, item: string) => {
      if (item === 'id') return `${acc}/${params[item]}`;
      // @ts-ignore
      return `${acc}/${item}/${params[item]}`;
    },
    '',
  )
);

export default getRoute;
