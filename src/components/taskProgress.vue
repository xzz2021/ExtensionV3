<!--
 * @Date: 2022-11-12 09:56:46
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-30 17:54:48
-->
<template>
  <vxe-modal className="taskProgressPanel"  v-model="taskShow" width="600" :position="{ top: 100 }" @hide="closeModal">
    <template #title>
      <div class="tasktitle"> 任务进程</div>
    </template>
        <div class="searchBox">
            <el-input style="width:454px;" v-model="searchKey" @input="searchData">
              <template #prefix>
          <div class="searchSvg">
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
            <path fill="currentColor" d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"></path></svg>
          </div>
        </template>
        <template #suffix>
                <el-button type="primary" class="searchBtn" text  @click="searchData">搜索</el-button>
        </template>
                </el-input>
            <el-button type="primary" @click="clearData"  class="clearBtn" >清空任务</el-button>
        </div>
    <div class="mainSec">
    <div class="tasklistBox" v-if="taskData2.self.length != 0">
        <div class="taskList" v-for="(item, index) in taskData2.self" :key="index">
          <div class="detailBox">
            <div class="taskSymbol"> <svg class="xzzsymbol" aria-hidden="true"> 
                <use :xlink:href="`#xzzicon2-${item.filetype}`"></use>
                <!-- <use xlink:href="#xzzicon2-zip"></use> -->
                </svg>
            </div>
            <div class="detailInfo">
                <div class="taskname" >{{ item.taskname }}</div>
                <div class="taskStatus" >
                    <div v-if="item.progress == 100" class="finished">已完成</div>
                    <div v-else class="probar">
                        <el-progress  :stroke-width="8" :percentage="item.progress"></el-progress>
                    </div>
                    <div class="size">{{item.size}}</div>
                </div>
            </div>
          </div>
          <div class="deleteSvg" @click="deleteData(item.timeStamp,index)"> 
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
        </div>
        </div>
    </div>
    <div v-else>
      <img class="emptyImg" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/emptyData.png"
        alt="当前没有任务记录" />
    </div>
    </div>
  </vxe-modal>

</template>

<script setup>
    // ---------☆☆☆☆-----------proxy的值存储storage必须先stringify,取值时再parse---------☆☆☆☆----------
    const taskShow = ref(false)
    const taskData = reactive({self:[]})
    const taskData2 = reactive({self:[]})
    const searchKey = ref('')

  watch(() => taskData.self, async (newV, oldV) => {
    // console.log('newV: ', newV)
    // return
    
    await API.Storage.set({'taskData':JSON.stringify(newV)})
    // await API.Storage.set('taskData',taskData.self)
      taskData2.value = newV
  }, { deep: true })

  const  closeModal = async() =>{
    }
  const  deleteData =  async (it,index) => {
      if(searchKey.value !== ''){
        taskData.self = taskData.self.filter(item => item.timeStamp != it)
        // await API.wait(0.05)
        searchData()
      }else{
        taskData.self.splice(index,1)
      }
    }
  const clearData = async () =>{
      taskData.self = []
    }
  const searchData = () =>{
      if(searchKey.value !== ''){
        taskData2.self = taskData.self.filter(item => item.taskname.indexOf(searchKey.value) != -1)
      }else{
        taskData2.self = taskData.self
      }
    }
    const caculateFilesize = (size) =>{
	    return size<0? "未知大小": size<1024? size+"B": size<1024*1024?(size/1024).toFixed(1)+"KB" : (size/(1024*1024)).toFixed(2)+"MB"
    }
  const addTask = async (taskobj) =>{
      if(Object.prototype.toString.call(taskobj) !== '[object Object]' && JSON.stringify(taskobj) === '{}')
      return  console.log('设定失败:参数必须是object且不能为空')
      taskobj.size = caculateFilesize(taskobj.size)
      taskobj.timeStamp = Date.now()
      // taskobj.progress = 100
      taskData.self.unshift(taskobj)
      // console.log('taskData.self: ', JSON.parse(JSON.stringify(taskData.self)) );
      await API.Storage.set({'taskData':JSON.stringify(taskData.self)})
    }
  onMounted(async () => { 
    API.emitter.on('openTaskprogress', () => {
      taskShow.value = true;
    })
    API.emitter.on('addTask', (taskobj) => {
      addTask(taskobj)
    })
    // setTimeout(() => {
    //   addTask({filetype: 'zip',taskname: '店铺信息汇总2.zip',size: 158753, progress: 60})
    //   addTask({filetype: 'video',taskname: '视频总66.mp4',size: 1583253, progress: 30})
    // }, 3000);

    taskData.self =  JSON.parse(await API.Storage.get('taskData')) || []
    taskData2.self = taskData.self
  })


// ------☆☆☆☆------任意组件内都可以使用此格式发送事件---------API.emitter.emit('addTask', {filetype: 'video',taskname: '视频.mp4',size: 1528753, progress: 30})
</script>

<style lang="scss" scoped>
@import '../css/sass/taskProgress.scss';

</style>
