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
    url: '/auth/student',
    method: 'post',
    params: param,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
