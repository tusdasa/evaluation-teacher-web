import request from '@/utils/request'

/**
 * 登录
 * @param {studentId, password} data 用户信息
 */
export function login(data) {
  const param = new URLSearchParams()
  param.append('studentId', data.studentId)
  param.append('password', data.password)
  return request({
    url: 'http://localhost:8080/service/auth/student',
    method: 'post',
    params: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8080/service/auth/studentinfo',
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function logout(token) {
  return request({
    url: 'http://localhost:8080/service/auth/logout/student',
    method: 'get',
    headers: { 'Authorization': token }
  })
}
