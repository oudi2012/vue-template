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
