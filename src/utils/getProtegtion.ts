const PROTECTIONS = {
  Ф: "федерального значения",
  Р: "регионального значения",
  М: "местного значения",
  В: 'выявленный'
}
export default function(protection: 'Ф' | 'Р' | 'М' | 'В') {
  return PROTECTIONS[protection] || '';
}
