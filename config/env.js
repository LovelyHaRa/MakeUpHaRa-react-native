import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'https://makeuphara.azurewebsites.net',
  },
  staging: {
    apiUrl: 'https://makeuphara.azurewebsites.net',
  },
  prod: {
    apiUrl: 'https://makeuphara.azurewebsites.net',
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
