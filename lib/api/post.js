import client from './client';
import qs from 'qs';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const readPost = ({ id }) => client.get(apiUrl + `/api/post/${id}`);
