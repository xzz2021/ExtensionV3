<template>
  <div class="jclLogin">
    <!-- <HasLogin /> -->
    <el-dialog v-model="dialogVisible" title="手机号登录/注册" width="400px" @closed="reset" :close-on-click-modal="false" center>

    <span v-if="userid">
      <div style="margin:0 auto;">您当前登录的账号是:</div>
     <div style="margin:0 auto; height:70px"></div>
     <div style="margin:0 auto; font-size:20px;text-align: center;color:red">{{userPhone}}</div>
     <div style="margin:0 auto; height:70px"></div>
     <div class="changeAccount" @click="switchAccount">切换账号</div>
    </span>
      <span v-else>
      <!-- <span> -->
        <el-form label-width="300" :model="loginForm" size="large" ref="ruleFormRef" :rules="rules">
          <el-form-item prop="phone">
            <el-input v-model.number="loginForm.phone" placeholder="+86"  maxlength="11" />
          </el-form-item>
          <el-form-item prop="code">
            <div class="codeSec" >

            <el-input class="codeinput" v-model="loginForm.code" placeholder="请输入验证码" size="large" maxlength="6" />
            <el-button class="getcode" plain @click="getCode(ruleFormRef)"  :disabled="btnDisabled">{{ codetitle }}</el-button>
            </div>
          </el-form-item>
          <el-form-item class="submititem">
            <div class="submitbtn" @click="submitForm(ruleFormRef)">登录</div>
          </el-form-item>
        </el-form>
      </span>
      <!-- <div class="getcode"> <el-button text="plain" link> 获取验证码</el-button></div> -->
      <div class="loginFail" v-if="loginError">验证码错误，请重新输入</div>
    </el-dialog>
  </div>
</template>
<script setup>
// import {ref, reactive, onMounted  } from 'vue'

import { storeToRefs } from 'pinia'
import { userStore } from '../stores/userStore'

const userstore = userStore();
const { userid, userPhone } = storeToRefs(userstore)
const ruleFormRef = ref()
const dialogVisible = ref(false)
const btnDisabled = ref(false)
const loginError = ref(false)
const codetitle = ref('获取验证码')
const rules = reactive({
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {type: 'number', message: '手机号必须是数字'},
          {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'}
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' },
        // { type: 'number', message: '验证码必须是数字' },
        { pattern: /^\d{6}$/, message: '请输入完整的验证码', trigger: 'blur' }
        ]
      })
const loginForm = reactive({phone: 16712753727, code: ''})
const openDialog = () => {
      dialogVisible.value = true
}
const reset = () => {
      loginForm.value = {}
      // ruleFormRef.resetFields();
      // Message.error({
      //     showClose: true,
      //     message: '您当前为普通用户,只能使用部分功能,登录后可以解锁全部VIP功能!',
      //     duration: 3000,
      //   })
    }
    const getCode = async (ruleFormRef) => {
      codetitle.value = 30;
      btnDisabled.value = true
      let codeInterval = setInterval(() => {
        codetitle.value--
        if (codetitle.value == 0) {
          clearInterval(codeInterval);
          codetitle.value = '获取验证码';
          btnDisabled.value = false
        }
      }, 1000)
      let config = {
        url: '?s=Home.Account.sendCode',
        method: 'post',
        body: {phone: loginForm.phone}
      }
      let msg = {type: 'myfetch', config}
      console.log('-------开始发送短信---------------');
      let res = await  API.sendMessage(msg) //-------------------------------------------------------------------
      console.log('------myfetchmyfetch--------res: ', res)
      if(res.ret == '200'){ ElMessage.success({message: `短信发送成功,请查收!`, duration: 1500, center: true})}
    }
  const  submitForm =  (ruleFormRef) => {
     if (!ruleFormRef) return
       ruleFormRef.validate(async (valid) => {
        if (valid) {
      let config = {
        url: '/?s=Home.Account.codelogin',
        // url: 'http://pddzdtest.junchenlun.com/pddzd/public/',      //测试接口
        body: loginForm
      }

     let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg) //---------------------
      console.log('------myfetchmyfetch--------res: ', res)
      if(res === undefined) return  ElMessage.success({message: '登录失败,请重新登录', duration: 1500, center: true})
      //--------------------------------------------------------
      if(res.ret == '200'){
      //如果登录成功,存储userid
      chrome.storage.local.set({userid: res.data.user_id})
      chrome.storage.local.set({userPhone: loginForm.phone})
      chrome.storage.local.set({userToken: res.data.token})
      //--------------------------------------------------------
      dialogVisible.value = false
        ElMessage.success({message: `成功:登录成功:${res.data.data.user_id}`, duration: 1000, showClose: true});
         //设定此次登录时间戳以及过期时间,到期后不存在即为过期
      // let res =  API.sendMessage({type: 'mycookies'})
      // console.log('------mycookiesmycookies--------res: ', res)
          // console.log('前端表单校验通过submit!');
        } else {ElMessage.error({message: `登录失败,原因:${res.msg},请核对验证码!`, duration: 1500, center: true})}
        }
      })
    }
  //   async isExpired() {
  //     //定义限定登录有效期函数,失效则置空user_id
  //     // 设定时间戳有效期
  //     //  let timeStamp = 3 * 24 *3600
  //     let timeStamp = 3 * 24 * 3600 * 1000;
  //     // 获取当前时间戳,精确到秒
  //     let currentStamp = Date.parse(new Date());
  //     // 获取上次登录时间
  //     let loginStamp = await 浏览器_get_storage('loginStamp');
  //     if (loginStamp == undefined || loginStamp == null) {
  //       浏览器_set_storage('loginStamp', currentStamp);
  //     } else {
  //       currentStamp - loginStamp < timeStamp || 浏览器_set_storage('user_id', '');
  //     }
  //     this.getID();
  //   },
  // },
  // const getStorage = () => {
  //   chrome.storage.local.get(['userid'], (result) =>{
  //     result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
  //   })
  // }
  const switchAccount = () => {
    userstore.userid = ''
    }
  onMounted(() => {
    
    API.emitter.on('iwantlogin', openDialog)
    //  console.log('-------chrome------------', chrome);
    // getStorage()
    })
</script>
<style lang="scss">
@import '../css/sass/loginpanel.scss';
</style>
