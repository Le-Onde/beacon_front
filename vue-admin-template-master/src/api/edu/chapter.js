import request from '@/utils/request'

export default{
    //1 根据课程id获取章节和小节数据的列表
    //current当前页，limit每页记录数，teacherQuery当前条件对象
    getAllChapterVideo(courseId){
        return request({
            url: '/eduservice/chapter/getChapterVideo/'+courseId,
            method: 'get'
          })
    },
    addChapter(chapter){
        return request({
            url: '/eduservice/chapter/addChapter',
            method: 'post',
            data: chapter
          })
    },
    getChapter(chapterId){
        return request({
            url: '/eduservice/chapter/getChapterInfo/'+chapterId,
            method: 'get'
          })
    },
    updateChapter(chapter){
        return request({
            url: '/eduservice/chapter/updateChapter',
            method: 'post',
            data: chapter
          })
    },
    deleteChapter(chapterId){
        return request({
            url: '/eduservice/chapter/'+chapterId,
            method: 'delete'
          })
    }

}