import request from '@/utils/request'
import { getToken } from '@/utils/auth'

const token = getToken()

export function getList(token) {
  return request({
    url: 'http://localhost:8080/service/thirdkpi/',
    method: 'get',
    headers: { 'Authorization': token }
  })
}
