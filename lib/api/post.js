import client from './client';
import qs from 'qs';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const readPost = ({ id }) => client.get(apiUrl + `/api/post/${id}`);

export const getList = ({ page, tag, username, query, block, oldest, day }) => {
  const queryString = qs.stringify({
    page,
    tag,
    username,
    query,
    block,
    oldest,
    day,
  });
  return client.get(apiUrl + `/api/post/list?${queryString}`);
};
