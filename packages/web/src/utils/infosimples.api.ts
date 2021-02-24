import axios from 'axios';

export const infosimples = axios.create({
  baseURL: 'https://api.infosimples.com/api/v1',
});
