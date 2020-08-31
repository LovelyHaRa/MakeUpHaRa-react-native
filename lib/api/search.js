import client from './client';
import qs from 'qs';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const TotalSearch = ({ query, page, block }) => {
  const queryString = qs.stringify({
    query,
    page,
    block,
  });
  return client.get(`${apiUrl}/api/search/total?${queryString}`);
};
