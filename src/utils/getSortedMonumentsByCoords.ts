import MonumentIntarface from 'interfaces/Monument';

const getSortedMonumentsByCoords = (monuments: MonumentIntarface[]) => {
  const sortedMonuments = monuments.reduce((acc, monument: MonumentIntarface) => {
    const key = `${monument.lat}_${monument.lon}`;
    // @ts-ignore
    if (acc[key]) {
      // @ts-ignore
      return { ...acc, [key]: acc[key].concat(monument) };
    }

    return { ...acc, [key]: [monument] };
  }, {});

  // @ts-ignore
  return Object.keys(sortedMonuments).map((key) => sortedMonuments[key]);
};

export default getSortedMonumentsByCoords;
