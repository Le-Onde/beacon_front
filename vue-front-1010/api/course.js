import request from '@/utils/request'
export default {
  //条件分页课程查询
  getCourseList(page,limit,searchObj){
    return request({
      url: `/eduservice/courseFront/getFrontCourseList/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //查询所有分类方法
  getAllSubject(id){
    return request({
      url: `/eduservice/subject/getAllSubject`,
      method: 'get'
    })
  },
  //课程详情的方法
  getCourseInfo(id){
    return request({
      url: `/eduservice/courseFront/getFrontCourseInfo/${id}`,
      method: 'get'
    })
  }
}