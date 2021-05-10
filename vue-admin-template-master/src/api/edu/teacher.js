import request from '@/utils/request'

export default{
    //1 讲师列表 （条件分页查询)
    //current当前页，limit每页记录数，teacherQuery当前条件对象
    getTeacherListPage(current,limit,teacherQuery){
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示对象转换成json传递到接口里面
            data: teacherQuery
          })
    },
    //删除讲师
    deleteTeacherId(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    //回显
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'
        })
    },
    //修改
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/teacher/UpdateTeacher`,
            method: 'post',
            data: teacher
        })
    }
}

