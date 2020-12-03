const PROTECTIONS = {
  Ф: ' федерального значения',
  Р: ' регионального значения',
  М: ' местного значения',
  В: ', выявленный',
};
const getProtection = (protection: 'Ф' | 'Р' | 'М' | 'В') => (
  PROTECTIONS[protection] || ''
);

export default getProtection;
