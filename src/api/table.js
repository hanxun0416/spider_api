import request from '@/utils/request'

export function getList(data,params) {
  return request({
    url: '/app/list',
    method: 'post',
    data:data,
    params
  })
}

export function getApp(id){
  return request({
    url: `/app/${id}`,
    method: 'get',
  })
}
export function test(){
  return request({
    url: '/',
    method: 'get',
  })
}
