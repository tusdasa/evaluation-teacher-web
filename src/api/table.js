import request from '@/utils/request'

export function getList() {
  return request({
    url: 'tevaluation/teacher',
    method: 'get'
  })
}

export function getKpiList() {
  return request({
    url: 'tevaluation/',
    method: 'get'
  })
}

export function sendEvaluationData(result) {
  return request({
    url: 'tevaluation/result',
    method: 'post',
    data: result
  })
}

export function getAllFirstKPI() {
  return request({
    url: 'admin/first/',
    method: 'get'
  })
}

export function getAllSecondKPI() {
  return request({
    url: 'admin/second/',
    method: 'get'
  })
}

export function getAllThirdKPI() {
  return request({
    url: 'admin/third/',
    method: 'get'
  })
}

export function getAllCalculationRule() {
  return request({
    url: 'admin/rule/calculation',
    method: 'get'
  })
}
