import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/vue-element-admin/article/list',
    method: 'get',
    params: query
  })
}

//获取文章详情
export function fetchArticle(id) {
  return request({
    url: `/app/${id}`,
    method: 'get',
  })
}
//保存文章
export function saveArticle(id,data) {
  return request({
    url: `/app/${id}`,
    method: 'PUT',
    data
  })
}

//获取站点信息
export function getSite(data,params) {
  return request({
    url: '/site/list',
    method: 'post',
    data,
    params
  })
}

export function testJwt(){
  return request({
    url: '/protected',
    method: 'get',
   
  })
}


export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/vue-element-admin/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/vue-element-admin/article/update',
    method: 'post',
    data
  })
}
