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
    url: 'admin/first',
    method: 'get'
  })
}

export function getAllSecondKPI() {
  return request({
    url: 'admin/second',
    method: 'get'
  })
}

export function getAllThirdKPI() {
  return request({
    url: 'admin/third',
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
    url: 'admin/first',
    method: 'put',
    data: data
  })
}

export function createFirstKPI(data) {
  return request({
    url: 'admin/first',
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
    url: 'admin/second',
    method: 'put',
    data: data
  })
}

export function createSecondKPI(data) {
  return request({
    url: 'admin/second',
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
    url: 'admin/third',
    method: 'put',
    data: data
  })
}

export function createThirdKPI(data) {
  return request({
    url: 'admin/third',
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

export function findCalculationRuleById(id) {
  return request({
    url: 'admin/rule/calculation/' + String(id),
    method: 'get'
  })
}

export function createCalculationRule(data) {
  return request({
    url: 'admin/rule/calculation',
    method: 'post',
    data: data
  })
}

export function updateCalculationRule(data) {
  return request({
    url: 'admin/rule/calculation',
    method: 'put',
    data: data
  })
}

export function deleteCalculationRuleById(id) {
  return request({
    url: 'admin/rule/calculation/' + String(id),
    method: 'delete'
  })
}

export function findAllLevels() {
  return request({
    url: 'admin/rule/level',
    method: 'get'
  })
}

export function findAllEvidence() {
  return request({
    url: 'admin/rule/evidence',
    method: 'get'
  })
}

export function findEvidenceById(id) {
  return request({
    url: 'admin/rule/evidence/' + String(id),
    method: 'get'
  })
}

export function createEvidence(data) {
  return request({
    url: 'admin/rule/evidence',
    method: 'post',
    data: data
  })
}

export function deleteEvidence(id) {
  return request({
    url: 'admin/rule/evidence/' + String(id),
    method: 'delete'
  })
}

export function updateEvidence(data) {
  return request({
    url: 'admin/rule/evidence',
    method: 'put',
    data: data
  })
}

export function findLevelById(id) {
  return request({
    url: 'admin/rule/level/' + String(id),
    method: 'get'
  })
}

export function deleteLevel(id) {
  return request({
    url: 'admin/rule/level/' + String(id),
    method: 'delete'
  })
}

export function updateLevel(data) {
  return request({
    url: 'admin/rule/level',
    method: 'put',
    data: data
  })
}

export function crateLevel(data) {
  return request({
    url: 'admin/rule/level',
    method: 'post',
    data: data
  })
}

export function findStudentById(id) {
  return request({
    url: 'admin/student/' + String(id),
    method: 'get'
  })
}

export function updateStudent(data) {
  return request({
    url: 'admin/student',
    method: 'put',
    data: data
  })
}

export function findAllDepartment() {
  return request({
    url: 'admin/data/department',
    method: 'get'
  })
}

export function findAllMajor() {
  return request({
    url: 'admin/data/major',
    method: 'get'
  })
}

export function findAllClass() {
  return request({
    url: 'admin/class/',
    method: 'get'
  })
}

export function findAllGrade() {
  return request({
    url: 'admin/grade',
    method: 'get'
  })
}

export function findTeacherById(id) {
  return request({
    url: 'admin/teacher/' + String(id),
    method: 'get'
  })
}

export function updateTeacher(data) {
  return request({
    url: 'admin/teacher',
    method: 'put',
    data: data
  })
}

export function findAllRole() {
  return request({
    url: 'admin/data/role',
    method: 'get'
  })
}

export function findAllProfessional() {
  return request({
    url: 'admin/data/professional',
    method: 'get'
  })
}

export function findAllState() {
  return request({
    url: 'admin/data/state',
    method: 'get'
  })
}

export function findAllRight() {
  return request({
    url: 'admin/right',
    method: 'get'
  })
}

export function findRightById(id) {
  return request({
    url: 'admin/right/' + String(id),
    method: 'get'
  })
}

export function updateRight(data) {
  return request({
    url: 'admin/right',
    method: 'put'
  })
}

export function getResult() {
  return request({
    url: 'admin/result',
    method: 'get'
  })
}

export function getDepartmentTeacher(page, size) {
  return request({
    url: 'admin/teacher/department?size=' + String(size) + '&page=' + String(page),
    method: 'get'
  })
}

export function getDepartmentTeacherResult(data) {
  return request({
    url: 'admin/calculate/ids',
    method: 'post',
    data: data
  })
}

