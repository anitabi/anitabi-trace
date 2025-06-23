import { defineMock } from 'vite-plugin-mock-dev-server';
import bangumiData from './bangumi.json'

export default defineMock([
  {
    url: '/api/bangumi',
    body: bangumiData
  }
]);