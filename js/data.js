// Combines smaller data files into the appData object used by main.js.
const appData = {
  brands: window.deviceGuideBrands || [],
  devices: window.deviceGuideDevices || {},
  tutorials: window.deviceGuideTutorials || {}
};
