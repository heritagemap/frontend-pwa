const PROTECTIONS = {
  Ф: "объект федерального значения",
  Р: "объект регионального значения",
  М: "объект местного значения",
  В: 'выявленный'
}
export default function(protection: 'Ф' | 'Р' | 'М' | 'В') {
  return PROTECTIONS[protection] || '';
}
