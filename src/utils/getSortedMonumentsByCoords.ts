import MonumentIntarface from 'interfaces/Monument';

interface AccInterface {
  [key: string]: MonumentIntarface[]
}

const getSortedMonumentsByCoords = (monuments: MonumentIntarface[]): MonumentIntarface[][] => {
  const sortedMonuments = monuments.reduce((acc: AccInterface, monument: MonumentIntarface) => {
    const key = `${monument.lat}_${monument.lon}`;

    if (acc[key]) {
      return { ...acc, [key]: acc[key].concat(monument) };
    }

    return { ...acc, [key]: [monument] };
  }, {});

  return Object.keys(sortedMonuments).map((key) => sortedMonuments[key]);
};

export default getSortedMonumentsByCoords;
