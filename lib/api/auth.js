import client from './client';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const login = ({ username, password }) =>
  client.post(apiUrl + '/api/auth/login', { username, password });

export const check = () => client.get(apiUrl + '/api/auth/check');

export const logout = () => client.post(apiUrl + '/api/auth/logout');
