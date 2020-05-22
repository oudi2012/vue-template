import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/fms/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/fms/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/fms/user/logout',
    method: 'post'
  })
}
