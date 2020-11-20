import { Type } from 'interfaces/FullInfo';

const TYPE_OF_MONUMENT = {
  architecture1: 'Памятник архитектуры',
  history1: 'Памятник истории',
  archeology1: 'Памятник археологии',
  monument1: 'Памятник монументального искусства',
  settlement1: 'Историческое поселение',
  architecture0: 'Обладает признаками памятника архитектуры, не охраняется государством',
  history0: 'Обладает признаками памятника истории, не охраняется государством',
  archeology0: 'Обладает признаками памятника археологии, не охраняется государством',
  monument0: 'Обладает признаками памятника монументального искусства, не охраняется государством',
  settlement0: 'Обладает признаками исторического поселения, не охраняется государством'
};

export default function(type: Type, knid: string) {
  // @ts-ignore
  return TYPE_OF_MONUMENT[type + knid[2]] || '';
}
