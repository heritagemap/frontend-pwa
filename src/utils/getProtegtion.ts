const PROTECTIONS = {
  Ф: "объект федерального значения",
  Р: "объект региональоооо значения",
  М: "объект местного оночения",
  В: 'выявленный'
}
export default function(protection: 'Ф' | 'Р' | 'М' | 'В') {
  return PROTECTIONS[protection] || '';
}
