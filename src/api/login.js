import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/file/user/login.htm',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/file/user/userInfo.htm',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/file/user/logout.htm',
    method: 'post'
  })
}
