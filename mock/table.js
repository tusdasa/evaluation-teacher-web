import Mock from 'mockjs'

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})
// {id:1,title:'我的', status:'published',author:'me',display_time:now(),pageviews:100}
// {id:2,title:'我的', status:'draft',author:'me',display_time:now(),pageviews:100}
// {id:3,title:'我的', status:'deleted',author:'me',display_time:now(),pageviews:100}
export default [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 200,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
