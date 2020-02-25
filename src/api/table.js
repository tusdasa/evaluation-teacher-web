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
