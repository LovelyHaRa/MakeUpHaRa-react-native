import client from './client';
import qs from 'qs';
import getEnvVars from '../../config/env';

const { apiUrl } = getEnvVars();

export const getDocumentByBarcode = ({ code }) => {
  const queryString = qs.stringify({ code });
  return client.get(apiUrl + `/api/wiki/search/barcode?${queryString}`);
};

export const getHistory = ({ title }) =>
  client.get(apiUrl + `/api/wiki/${title}/history`);

export const getRevisionDocument = ({ title, r }) => {
  const queryString = qs.stringify({ r });
  return client.get(apiUrl + `/api/wiki/${title}?${queryString}`);
};

export const getSearchList = ({
  query,
  oldest,
  shortest,
  longest,
  page,
  block,
}) => {
  const queryString = qs.stringify({
    query,
    oldest,
    shortest,
    longest,
    page,
    block,
  });
  return client.get(apiUrl + `/api/wiki/search?${queryString}`);
};

export const readDocument = ({ id, r }) => {
  const queryString = qs.stringify({ r });
  return client.get(apiUrl + `/api/wiki/${id}?${queryString}`);
};
