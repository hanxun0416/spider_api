import request from '@/utils/request'
//获取列表
export function dashboard() {
  return request({
    url: '/app/dashboard',
    method: 'post',
    
  })
}

