import request from '@/utils/request'

export default{
    //1 添加课程信息
    //current当前页，limit每页记录数，teacherQuery当前条件对象
    addCourseInfo(courseInfo){
        return request({
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data:courseInfo
          })
    },
    //2 查询所有讲师
    getListTeacher(){
        return request({
            url: `/eduservice/teacher/findAll`,
            method: 'get'
          })
    },
    getCourseInfoId(id){
        return request({
            url: '/eduservice/course/getCourseInfo/'+id,
            method: 'get'
          })
    },
    updateCourseInfo(courseInfo){
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    //课程确认信息
    getPublishCourseInfo(id){
        return request({
            url: '/eduservice/course/getPublishCourseInfo/'+id,
            method: 'get'
        })
    },
    //课程最终发布
    publishCourse(id){
        return request({
            url: '/eduservice/course/publishCourse/'+id,
            method: 'post'
        })
    },
    //课程列表
    getListCrouse(){
        return request({
            url: '/eduservice/course',
            method: 'get'
        })
    },
    //删除课程
    deleteCourseId(id){
        return request({
            url: `/eduservice/course/${id}`,
            method: 'delete'
          })
    },
    //1 课程列表 （条件分页查询)
    //current当前页，limit每页记录数，courseQuery当前条件对象
    getCourseListPage(current,limit,courseQuery){
        return request({
            url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
            method: 'post',
            //courseQuery条件对象，后端使用RequestBody获取数据
            //data表示对象转换成json传递到接口里面
            data: courseQuery
          })
    }
}

