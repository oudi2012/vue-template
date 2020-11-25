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

export function sysInfoFind(id) {
  return request({
    url: '/sys/app/findById.htm?id=' + id,
    method: 'get'
  })
}

export function sysInfoUpdate(data) {
  return request({
    url: '/sys/app/edit.htm',
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

export function apiInfoFind(id) {
  return request({
    url: '/sys/apiInfo/findById.htm?id=' + id,
    method: 'get'
  })
}

export function apiInfoCreate(data) {
  return request({
    url: '/sys/apiInfo/create.htm',
    method: 'post',
    data
  })
}

export function apiInfoUpdate(data) {
  return request({
    url: '/sys/apiInfo/edit.htm',
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

export function templateItemPageList(data) {
  return request({
    url: '/sys/templateItem/pageList.htm',
    method: 'get',
    params: data
  })
}

export function templateItemCreateList(data) {
  return request({
    url: '/sys/templateItem/createList.htm',
    method: 'post',
    data
  })
}

export function templateItemRemove(id) {
  return request({
    url: '/sys/templateItem/removeById.htm?id=' + id,
    method: 'get'
  })
}

export function queueInfoPageList(data) {
  return request({
    url: '/sys/exportQueue/pageList.htm',
    method: 'get',
    params: data
  })
}

export function queueInfoUpdate(data) {
  return request({
    url: '/sys/exportQueue/edit.htm',
    method: 'post',
    data
  })
}

export function queueInfoFindById(id) {
  return request({
    url: '/sys/exportQueue/findById.htm?id=' + id,
    method: 'get'
  })
}

export function queueInfoRemoveById(id) {
  return request({
    url: '/sys/exportQueue/removeById.htm?id=' + id,
    method: 'get'
  })
}

export function sysParamInfoPageList(data) {
  return request({
    url: '/sys/param/pageList.htm',
    method: 'get',
    params: data
  })
}

export function sysParamInfoCreate(data) {
  return request({
    url: '/sys/param/create.htm',
    method: 'post',
    data
  })
}

export function sysParamInfoUpdate(data) {
  return request({
    url: '/sys/param/edit.htm',
    method: 'post',
    data
  })
}

export function sysParamInfoFindById(id) {
  return request({
    url: '/sys/param/findById.htm?id=' + id,
    method: 'get'
  })
}

export function testRequestUrl(userId, code, data) {
  return request({
    url: '/export/fileExport.htm?userId=' + userId + '&code=' + code,
    method: 'post',
    data
  })
}

export function urlToJsonForm(data) {
  return request({
    url: '/sys/tools/urlToJson.htm',
    method: 'post',
    data
  })
}
