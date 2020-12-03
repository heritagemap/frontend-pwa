const PROTECTIONS = {
  Ф: " федерального значения",
  Р: " регионального значения",
  М: " местного значения",
  В: ", выявленный",
};
const getProtection = function (protection: "Ф" | "Р" | "М" | "В") {
  return PROTECTIONS[protection] || "";
};

export default getProtection;
