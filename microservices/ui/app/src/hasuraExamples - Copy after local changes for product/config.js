var REACT_APP_CLUSTER_NAME = 'beseeching73'
var projectConfig = {
  url: {
    data: "https://data." + REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/query",
    auth: "https://auth." + REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1",
    filestore: "https://filestore." + REACT_APP_CLUSTER_NAME + ".hasura-app.io/v1/file"
  }
}
//projectConfig.url.data = 'http://localhost:6432/v1/query';
const saveOffline = (authToken) => {
  window.localStorage.setItem('authToken', authToken);
}

const getSavedToken = () => {
  return window.localStorage.getItem('authToken');
}

module.exports = {
  projectConfig,
  saveOffline,
  getSavedToken
};
