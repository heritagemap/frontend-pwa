import { Type } from 'interfaces/FullInfo';

const TYPE_OF_MONUMENT = {
  architecture1: 'Памятник архитектуры',
  history1: 'Памятник истории',
  archeology1: 'Памятник археологии',
  monument1: 'Памятник монументального искусства',
  settlement1: 'Историческое поселение',
  architecture0:
    'Обладает признаками памятника архитектуры, не охраняется государством',
  history0: 'Обладает признаками памятника истории, не охраняется государством',
  archeology0:
    'Обладает признаками памятника археологии, не охраняется государством',
  monument0:
    'Обладает признаками памятника монументального искусства, не охраняется государством',
  settlement0:
    'Обладает признаками исторического поселения, не охраняется государством',
};

const IS_OFFICIAL = {
  0: '1',
  1: '1',
  2: '1',
  3: '1',
  4: '0',
};

const getStatus = (type: Type, knid?: string): string => {
  if (!type || !knid || !knid[2]) return '';

  // @ts-ignore
  return TYPE_OF_MONUMENT[type + IS_OFFICIAL[knid[2]]] || '';
};

export default getStatus;
