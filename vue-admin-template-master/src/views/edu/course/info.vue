<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>

    <el-form label-width="120px">

    <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
    </el-form-item>

    <!-- 所属分类 TODO -->
    <el-form-item label="课程分类">
        <el-select
            v-model="courseInfo.subjectParentId"
            placeholder="请选择一级分类" @change="subjectLevelOneChanged">
            <el-option
            v-for="subject in SubjectOneList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"/>
        </el-select>

        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="请选择二级分类">
            <el-option
                v-for="subject in SubjectTwoList"
                :key="subject.value"
                :label="subject.title"
                :value="subject.id"/>
            </el-select>
    </el-form-item>
    <!-- 课程讲师 TODO -->
    <!-- 课程讲师 -->
    <el-form-item label="课程讲师">
        <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"/>
        </el-select>
    </el-form-item>



    <el-form-item label="总课时">
            <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介-->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>
        <!-- 课程封面-->
        <el-form-item label="课程封面">

            <el-upload
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
                :action="BASE_API+'/eduoss/fileoss'"
                class="avatar-uploader">
                <img :src="courseInfo.cover" width="400px" height="200px">
            </el-upload>

        </el-form-item>

        <el-form-item label="课程价格">
            <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
            <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import course from '@/api/edu/course'
import subject from '@/api/edu/subject'
import Tinymce from '@/components/Tinymce'
export default {
    //声明组件
    components: { Tinymce },
    data(){
        return{
            saveBtnDisabled:false,
            courseInfo:{
                title: '',
                subjectId: '',  //2
                subjectParentId: '',  //1
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '/static/java.jpg',
                price: 0
            },
            courseId: '',
            BASE_API: process.env.BASE_API, // 接口API地址
            teacherList:[],//封装所有讲师的数据
            SubjectOneList:[],
            SubjectTwoList:[]
        }
    },
    created(){
       this.init()
    },
    watch:{
        $route(to,form){
            this.init()
        }
    },
    methods:{
        init(){
            if(this.$route.params && this.$route.params.id){
            this.courseId = this.$route.params.id
            this.getInfo()
        }else{
            this.getListTeacher()
            this.getOnesubject()
            this.courseInfo.title=''
            }
        },
        getInfo(){
            course.getCourseInfoId(this.courseId)
            .then(response =>{
                //在courseInfo课程基本信息；包含 一级分类id 二级分类id
                this.courseInfo = response.data.courseInfoVo
                // 查询所有的分类，一级和二级
                subject.getSubjectList()
                .then(response =>{
                    //获取所有一级分类
                    this.SubjectOneList = response.data.list

                    //把所有的一级分类数组进行遍历，比较当前courseInfo里面一级分类id和所有的一级分类id是否一致
                    for(var i=0; i<this.SubjectOneList.length; i++){
                        //获取每个一级分类
                        var oneSubject = this.SubjectOneList[i]
                        //比较当前courseInfo里面一级分类id和所有的一级分类id
                        if(this.courseInfo.subjectParentId == oneSubject.id){
                            //获取一级分类中的所有二级分类
                            this.SubjectTwoList = oneSubject.children
                        }
                    }
                })
                //初始化所有讲师
                this.getListTeacher()
            })
        },
        //上传成功
        handleAvatarSuccess(res,file){
            this.courseInfo.cover = res.data.url
        },
        //上传封面之前
        beforeAvatarUpload(file){
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        subjectLevelOneChanged(value){
            for(var i=0;i<this.SubjectOneList.length;i++){
                var oneSubject = this.SubjectOneList[i]
                if(value === oneSubject.id){
                    this.SubjectTwoList = oneSubject.children
                    //把二级分类id值清空
                    this.courseInfo.subjectId = ''
                }
            }
        },
        getOnesubject(){
            subject.getSubjectList()
            .then(response =>{
                this.SubjectOneList = response.data.list
            })
        },
        getListTeacher(){
            course.getListTeacher()
            .then(response =>{
                this.teacherList = response.data.items
            })
        },
        //添加课程
        addCourse(){
            course.addCourseInfo(this.courseInfo)
            .then(response =>{
                //提示
                this.$message({
                    type: 'success',
                    message: '添加课程信息成功'
                })
                //跳转到第二步
                this.$router.push({path:'/course/chapter/'+response.data.courseId})
            })
            
        },
        //修改课程
        updateCourse(){
            course.updateCourseInfo(this.courseInfo)
            .then(response =>{
                //提示
                this.$message({
                    type: 'success',
                    message: '修改课程信息成功'
                })
                //跳转到第二步
                this.$router.push({path:'/course/chapter/'+this.courseId})
            })
        },
        saveOrUpdate(){
            //判断添加还是修改
            if(!this.courseInfo.id){
                //添加
                this.addCourse()
            }else{
                this.updateCourse()
            }
        }
    }
}
</script>
<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>