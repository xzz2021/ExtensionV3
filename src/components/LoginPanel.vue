<template>
  <div class="jclLogin">
    <!-- <HasLogin /> -->
    <el-dialog v-model="dialogVisible" title="手机号登录/注册" width="400px" @closed="reset" :close-on-click-modal="false" center>
    <!-- <template #header="{  }">
      <div class="my-header">
      </div>
    </template> -->
      <span>
        <el-form label-width="300" :model="loginForm" ref="ruleFormRef" :rules="rules">
          <el-form-item prop="phone">
            <el-input v-model.number="loginForm.phone" placeholder="+86" size="large" maxlength="11" />
          </el-form-item>
          <el-form-item prop="code">
            <el-input v-model="loginForm.code" placeholder="请输入验证码" size="large" maxlength="6" />
          </el-form-item>
          <el-form-item class="submititem">
            <div class="submitbtn" @click="submitForm(ruleFormRef)">登录</div>
          </el-form-item>
        </el-form>
      </span>
      <!-- <div class="getcode"> <el-button text="plain" link> 获取验证码</el-button></div> -->
      <div class="loginFail" v-if="loginError">验证码错误，请重新输入</div>
      <el-button class="getcode" plain @click="getCode(ruleFormRef)" link>{{ codetitle }}</el-button>
    </el-dialog>
  </div>
</template>
<script setup>
import {ref, reactive, onMounted  } from 'vue'
// import emitter from '../content/content'
const ruleFormRef = ref('')
const dialogVisible = ref(false)
const loginError = ref(false)
// const hasLogin = ref(true)
const codetitle = ref('获取验证码')
// const userAccount = ref('')
const rules = reactive({
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {type: 'number', message: '手机号必须是数字'},
          {pattern: /^1[345678]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur'},
        ],
        // pwd: [
        //   { required: true, message: '密码不能为空', trigger: 'blur' },
        // { type: 'number', message: '验证码必须是数字' },
        // { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: 'blur' }
        // ],
      })
const loginForm = reactive({phone: '', code: ''})
const openDialog = () => {
      dialogVisible.value = true;
}
const reset = () => {
      loginForm.value = {}
      ruleFormRef.resetFields();
      API.emitter.off('iwantlogin')
      // Message.error({
      //     showClose: true,
      //     message: '您当前为普通用户,只能使用部分功能,登录后可以解锁全部VIP功能!',
      //     duration: 3000,
      //   })
    }
  // methods: {
    const getCode = (codeForm) => {
      codetitle.value = 30;
      let codeInterval = setInterval(() => {
        codetitle.value--;
        if (codetitle.value == 0) {
          clearInterval(codeInterval);
          codetitle.value = '获取验证码';
        }
      }, 1000);
      const urlencoded = new URLSearchParams()
      urlencoded.append('phone', loginForm.phone)
      const  url = 'http://pddzd.junchenlun.com/?s=Home.Account.sendCode'
      let config = {
        method: 'post',
        body: urlencoded,
      };
      // let res = await 浏览器_跨域axios(config); //-------------------------------------------------------------------
      // console.log(res)
      // if(res.indexOf('后端服务器错误') != -1) { return Message.error({message: '服务器错误,请联系后端api管理员', duration: 1000, showClose: true})}
      // console.log(res.data)
      fetch(url, config).then((res) => res.json()).then((res) => console.log('成功发送获取验证码请求', res))

      // if(res.data.msg = "非法请求：请输入正确手机号格式"){}
    }
  //   submitForm(ruleFormRef) {
  //     this.$refs.ruleFormRef.validate((valid) => {
  //       if (valid) {
  //         let that = this;
  //         this.login(that);
  //         // console.log('前端表单校验通过submit!');
  //       } else {
  //         console.log('submit error!');

  //         return false;
  //       }
  //     });
  //   },
  //   async login(that) {
  //     let phone = this.loginForm.phone + '';
  //     let code = this.loginForm.code;
  //     // console.log('data>222:', data);
  //     let qs = require('qs');
  //     let data = qs.stringify({
  //       phone: phone,
  //       code: code,
  //     });
  //     var config = {
  //       method: 'post',
  //       url: 'http://pddzd.junchenlun.com//?s=Home.Account.codelogin',
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded',
  //         Cookie: 'PHPSESSID=m711i68ebmfcsqav4mrtfi9jg2',
  //       },
  //       data: data,
  //     };

  //     let res = await 浏览器_跨域axios(config);

  //     console.log(...color1, '短信接口>res:', res);
  //     // if(res.indexOf('后端服务器错误') != -1) { return Message.error({message: '服务器错误,请联系后端api管理员', duration: 1000, showClose: true})}
  //     if (res.data.data.user_id) {
  //       // await 浏览器_set_storage("user_id", res.data.user_id)
  //       // window.user_id = res.data.user_id
  //       // await localStorage.setItem('user_id', res.data.user_id);
  //       await 浏览器_set_storage('user_id', res.data.data.user_id);
  //       Message.success({message: `成功:登录成功:${res.data.data.user_id}`, duration: 1000, showClose: true});
  //       //设定此次登录时间戳
  //       let currentStamp = Date.parse(new Date());
  //       await 浏览器_set_storage('loginStamp', currentStamp);
  //       await 浏览器_set_storage('userPhone', phone);
  //       location.reload();
  //       // let userID = localStorage.getItem('user_id');
  //       // window.user_id = userID;
  //       //  let userID = res.data.user_id

  //       //     window.user_id = userID+"66666"

  //       that.dialogVisible = false;
  //     } else {
  //       that.loginError = true;
  //       setTimeout(() => {
  //         that.loginError = false;
  //       }, 4500);
  //       Message.error({message: `失败:登陆失败:${res.data.msg}`, duration: 1000, showClose: true});
  //     }
  //   },
  //   async getID() {
  //     // 全局获取user_id并赋值window.user_id
  //     let userID = await 浏览器_get_storage('user_id');
  //     if (userID == undefined || userID == '' || userID == null) {
  //       await 浏览器_set_storage('user_id', '');
  //       console.log(...color1, 'contentcontentcontent--置空后--userID', userID);
  //     }
  //     window.user_id = userID;
  //     console.log(...color1, '2contentcontentcontent--最新--window.user_id', window.user_id);
  //   },
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
  // created() {
  //   this.isExpired();
  // },
  // async created() {

  // },
  onMounted(() => {
    API.emitter.on('iwantlogin', openDialog)
    })
</script>
<style lang="scss">
@import '../css/sass/loginpanel.scss';
</style>
