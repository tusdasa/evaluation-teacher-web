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

export function getFirstKPIById(id) {
  return request({
    url: 'admin/first/' + String(id),
    method: 'get'
  })
}

export function updateFirstKPI(data) {
  return request({
    url: 'admin/first/',
    method: 'put',
    data: data
  })
}

export function createFirstKPI(data) {
  return request({
    url: 'admin/first/',
    method: 'post',
    data: data
  })
}

export function deleteFirstKPI(id) {
  return request({
    url: 'admin/first/' + String(id),
    method: 'delete'
  })
}

export function findSecondKPIById(id) {
  return request({
    url: 'admin/second/' + String(id),
    method: 'get'
  })
}

export function updateSecondKPI(data) {
  return request({
    url: 'admin/second/',
    method: 'put',
    data: data
  })
}

export function createSecondKPI(data) {
  return request({
    url: 'admin/second/',
    method: 'post',
    data: data
  })
}

export function deleteSecondKPI(id) {
  return request({
    url: 'admin/second/' + String(id),
    method: 'delete'
  })
}

export function findThirdKPIById(id) {
  return request({
    url: 'admin/third/' + String(id),
    method: 'get'
  })
}

export function updateThirdKPI(data) {
  return request({
    url: 'admin/third/',
    method: 'put',
    data: data
  })
}

export function createThirdKPI(data) {
  return request({
    url: 'admin/third/',
    method: 'post',
    data: data
  })
}

export function deleteThirdKPI(id) {
  return request({
    url: 'admin/third/' + String(id),
    method: 'delete'
  })
}
