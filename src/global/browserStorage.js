const ___exists = (key) => {
  return localStorage.getItem(key) !== null;
}
const ___get = (key) => {
  return JSON.parse(localStorage.getItem(key));
}
const ___set = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}
export const browserStorage = {
  exists: ___exists,
  get: ___get,
  set: ___set
};