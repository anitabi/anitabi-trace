import bangumiData from './bangumi.json'

export default [
  {
    url: '/api/bangumi',
    method: 'get',
    response: ({ query }) => {
      return bangumiData;
    },
  },
]