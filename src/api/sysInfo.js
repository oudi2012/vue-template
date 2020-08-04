import request from '@/utils/request'

export function sysInfoPageList(data) {
  return request({
    url: '/sys/app/pageList.htm',
    method: 'get',
    params: data
  })
}

export function sysInfoCreate(data) {
  return request({
    url: '/sys/app/create.htm',
    method: 'post',
    data
  })
}

export function sysInfoRemove(appId) {
  return request({
    url: '/sys/app/removeById.htm?appId=' + appId,
    method: 'get'
  })
}

export function apiInfoPageList(data) {
  return request({
    url: '/sys/apiInfo/pageList.htm',
    method: 'get',
    params: data
  })
}

export function apiInfoCreate(data) {
  return request({
    url: '/sys/apiInfo/create.htm',
    method: 'post',
    data
  })
}

export function apiInfoRemove(apiId) {
  return request({
    url: '/sys/apiInfo/removeById.htm?apiId=' + apiId,
    method: 'get'
  })
}

export function templatePageList(data) {
  return request({
    url: '/sys/template/pageList.htm',
    method: 'get',
    params: data
  })
}

export function templateCreate(data) {
  return request({
    url: '/sys/template/create.htm',
    method: 'post',
    data
  })
}

export function templateRemove(tplId) {
  return request({
    url: '/sys/template/removeById.htm?tplId=' + tplId,
    method: 'get'
  })
}
