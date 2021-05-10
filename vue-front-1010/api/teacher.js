import request from '@/utils/request'
export default {
  //分页讲师查询
  getTeacherList(page,limit){
    return request({
      url: `/eduservice/teacherFront/getTeacherFrontList/${page}/${limit}`,
      method: 'post'
    })
  },
  //讲师详情方法
  getTeacherInfo(id){
    return request({
      url: `/eduservice/teacherFront/getTeacherFrontInfo/${id}`,
      method: 'get'
    })
  }
}