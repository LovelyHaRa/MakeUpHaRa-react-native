import client from './client';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const checkExistUsername = ({ username }) =>
  client.post(`${apiUrl}/api/user/check/username`, { username });

export const checkExistName = ({ username, name }) =>
  client.post(`${apiUrl}/api/user/check/name`, { username, name });

export const changePassword = ({ id, password, newPassword }) =>
  client.patch(`${apiUrl}/api/user/password`, { id, password, newPassword });
