import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://39.113.253.217:4000',
  },
  staging: {
    apiUrl: 'https://makeuphara.herokuapp.com/',
  },
  prod: {
    apiUrl: 'https://makeuphara.herokuapp.com/',
  },
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  if (__DEV__) {
    return ENV.dev;
  } else if (env === 'staging') {
    return ENV.staging;
  } else if (env === 'prod') {
    return ENV.prod;
  }
};

export default getEnvVars;
