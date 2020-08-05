import request from '@/utils/request'
//获取列表
export function getList(data,params) {
  return request({
    url: '/app/list',
    method: 'post',
    data:data,
    params
  })
}
//获取详情
export function getApp(id){
  return request({
    url: `/app/${id}`,
    method: 'get',
  })
}
//测试token
export function test(){
  return request({
    url: '/',
    method: 'get',
  })
}

export function updatestatus(data){
  return request({
    url: '/app/updatestatus',
    method: 'post',
    data
  })
}
