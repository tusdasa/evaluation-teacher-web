import request from '@/utils/request'

export function getList(token) {
  return request({
    url: 'http://localhost:8080/service/tevaluation/teacher',
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function getKpiList(token) {
  return request({
    url: 'http://localhost:8080/service/tevaluation/',
    method: 'get',
    headers: { 'Authorization': token }
  })
}
