import request from '@/utils/request'

/**
 * 登录
 * @param {workId, password} data 用户信息
 */
export function login(data) {
  const param = new URLSearchParams()
  param.append('workId', data.workId)
  param.append('password', data.password)
  return request({
    url: 'http://localhost:8080/service/auth/teacher',
    method: 'post',
    params: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function getInfo(token) {
  return request({
    url: 'http://localhost:8080/service/auth/teacherinfo',
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function logout(token) {
  return request({
    url: 'http://localhost:8080/service/auth/logout/teacher',
    method: 'get',
    headers: { 'Authorization': token }
  })
}
