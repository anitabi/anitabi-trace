
import { defineMock } from 'vite-plugin-mock-dev-server';
import rankData from './rank.json'

export default defineMock([
  {
    url: '/api/rank',
    body: rankData
  }
]);