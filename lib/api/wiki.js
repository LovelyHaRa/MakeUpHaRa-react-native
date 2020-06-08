import client from './client';
import qs from 'qs';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const getTitleByBarcode = ({ code }) => {
  const queryString = qs.stringify({ code });
  return client.get(apiUrl + `/api/wiki/search/barcode?${queryString}`);
};
