import request from '@/utils/request'

export function getList(token) {
  return request({
    url: 'http://localhost:8080/service/sevaluation/',
    method: 'get',
    headers: { 'Authorization': token }
  })
}
