import request from '@/utils/request'

export function nomalRefund(data) {
  return request({
    url: '/refundOrder/refund.htm',
    method: 'post',
    data
  })
}

export function thirdRefund(data) {
  return request({
    url: '/refundOrder/refundThird.htm',
    method: 'post',
    data
  })
}
