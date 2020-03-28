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
    url: 'auth/teacher',
    method: 'post',
    data: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function getInfo(token) {
  return request({
    url: 'auth/teacherinfo',
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function logout(token) {
  return request({
    url: 'auth/logout/teacher',
    method: 'get',
    headers: { 'Authorization': token }
  })
}

export function restPassword(data) {
  const param = new URLSearchParams()
  param.append('new', data.newPassword)
  param.append('old', data.oldPassword)
  return request({
    url: 'auth/rest/teacher',
    method: 'put',
    data: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
