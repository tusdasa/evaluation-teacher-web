import request from '@/utils/request'

export function getList() {
  return request({
    url: 'http://localhost:8080/service/tevaluation/teacher',
    method: 'get'
  })
}

export function getKpiList() {
  return request({
    url: 'http://localhost:8080/service/tevaluation/',
    method: 'get'
  })
}

export function sendEvaluationData(result) {
  return request({
    url: 'http://localhost:8080/service/tevaluation/result',
    method: 'post',
    data: result
  })
}

export function getAllFirstKPI() {
  return request({
    url: 'http://localhost:8080/service/admin/first/',
    method: 'get'
  })
}

export function getAllSecondKPI() {
  return request({
    url: 'http://localhost:8080/service/admin/second/',
    method: 'get'
  })
}

export function getAllThirdKPI() {
  return request({
    url: 'http://localhost:8080/service/admin/third/',
    method: 'get'
  })
}
