<template>
  <div class="loginPanel">
    <el-dialog :model-value="loginShow" width="820px" @closed="loginClose(ruleFormRef)"  center>
    <!-- <el-button type="primary">Prima233</el-button> -->
      <div class="mainSection">
        <div class="left">
         <img class="logo" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/loginLogo.png" alt="welcome to login">

      </div>
        <div v-if="!checkPhone" class="right">
          <div class="title">谋臣界-电商工具箱</div>
          <div class="tip">一个让运营工作更高效的平台</div>
          <div class="formBox">
            <el-form  :model="loginForm"  ref="ruleFormRef" :rules="rules" >
              <el-form-item size="large" prop="phone">
                <div class="phoneSec">
                <el-input v-model.number="loginForm.phone" placeholder="手机号" maxlength="11" />
                <div class="dropdownBox">
              <el-dropdown @command="inputAccount" placement="bottom-end">
               <span class="el-dropdown-link">
                <i class="funicon-dropdown listDropdown"></i>
               </span>
               <template  #dropdown>
               <el-dropdown-menu v-if="userList.self.length" >
                 <el-dropdown-item v-for="(item, index) in userList.self" :key="index" :command="item.userPhone">{{item.userPhone}}</el-dropdown-item>
               </el-dropdown-menu>
               </template>
              </el-dropdown>
              </div>
              </div>
          </el-form-item>
          <el-form-item size="large" prop="code">
            <div class="codeSec" >
            <el-input class="codeinput" v-model="loginForm.code" placeholder="验证码"  maxlength="6" />
            <div v-if="codetime == 0" class="getcode"  @click="getCode(ruleFormRef)">获取验证码</div>
            <div v-else class="fetchCode">{{ codetime }}</div>
            </div>
          </el-form-item>
          <el-form-item class="submititem">
            <div class="submitbtn" @click="submitForm(ruleFormRef)">登录</div>
          </el-form-item>
          <el-form-item>
            <div class="tipBox">
              <el-checkbox-group v-model="loginForm.keep" >
              <el-checkbox label="记住用户名" name="keep"></el-checkbox>
            </el-checkbox-group>
              <div class="tip2">未注册手机号登录将自动注册</div>
            </div>
          </el-form-item>
        </el-form>
        <div class="errorTip" v-if="codeError">验证码错误</div>
          </div>
        </div>
        <div v-else class="right2">
          <div class="title">
            <div class="tip">切换账号</div>
            <div class="exchangeBtn" @click="goToChange">登录其他账号</div>
          </div>
          <div class="phoneBox">
            <div class="listBox one">
              <div class="list">
                <div class="phone onecolor">{{userInfo.value.userPhone}}</div>
                <div class="phone onecolor">当前</div>
              </div>
            <el-divider></el-divider>
            </div>
            <div class="listBox" v-for="(item, index) in infoList.self" :key="index" >
              <div class="list">
                <div class="phone" @click="changeAccount(item)">{{item.userPhone}}</div>
                <div class="deleteBtn" @click="deletePhone(item)"><i class="funicon-loginguanbi"></i></div>
              </div>
            <el-divider></el-divider>
            </div>
            </div>
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script setup>


const ruleFormRef = ref()
let codetime = ref(0)
let loginShow = ref(false)
let codeError = ref(false)
let checkPhone = ref(false)
let userList = reactive({self:[]})
let infoList = reactive({self:[]})
let userInfo = reactive({})
let loginForm = reactive({ phone: null, code: '', keep: ['记住用户名'] })
// console.log('loginForm.code: ', loginForm.code);

// console.log('loginForm.keep: ', loginForm.keep[0])



// console.log('loginForm.keep: ', JSON.parse(JSON.stringify(loginForm.keep)))
const rules = reactive({
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { type: 'number', message: '手机号必须是数字' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号', trigger: 'blur' },
        ],
        code: [
          { required: true,pattern: /^\d{6}$/, message: '验证码错误', trigger: 'blur' }
        ]
      })
    
    const inputAccount = (e) => {
      loginForm.phone = e
    }
     const goToChange = () =>{
      checkPhone.value = false
    }
    
    const getCode = async  (ruleFormRef) => {
      let isphoneValid
     await ruleFormRef.validateField(["phone"], (valid) => { 
        isphoneValid = valid
      })
      if (!isphoneValid) return ElMessage.error({ message: '请输入正确的手机号!', duration: 1500 })
      codetime.value = 30
      let codeInterval = setInterval(() => {
        codetime.value--
        if (codetime.value == 0) {
          clearInterval(codeInterval);
        }
      }, 1000);
      let config = {
            url: '?s=Home.Account.sendCode',
            method: 'post',
            body: {phone: loginForm.phone}
            }

          let msg = {type: 'myfetch', config}
          let res = await  API.sendMessage(msg)
      console.log('----验证码发送返回数据---------',res)
      // if(res.indexOf('后端服务器错误') != -1) { return ElMessage.error({ElMessage: '服务器错误,请联系后端api管理员', duration: 1000, showClose: true})}
      if (res.ret == 200 && res.msg == '') {
        ElMessage.success({ message: '验证码发送成功:请查收!', duration: 1500 })
      } else {
        ElMessage.error({ message: `验证码发送失败,原因:${res.data.msg}`, duration: 1500 })
      }
      // if(res.data.msg = "非法请求：请输入正确手机号格式"){}
    }
    const submitForm = async (ruleFormRef) => {
          let isValid
     await ruleFormRef.validate((valid, fields) => {
        isValid = valid
      })
      if (!isValid) return ElMessage.error({ message: '输入有误,请重试!', duration: 1500 })
      let config = {
        url: '/?s=Home.Account.codelogin',
        body: loginForm
      };
      let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg)  
      console.log('------myfetchmyfetch-----login------res: ', res)
        let user_id = res.data.user_id || ''
      if (user_id) {
      let userInfoUpdate =  {userid: user_id, userToken: res.data.token, userPhone: loginForm.phone, timeStamp: Date.parse(new Date())}
        await  API.Storage.set({userInfo: userInfoUpdate})
          let userListUpdate =  await  API.Storage.get('userList') || []
          console.log('userListUpdate: ', userListUpdate);
          if(loginForm.keep[0] == '记住用户名'){
            if(userListUpdate == []){
              userListUpdate.push(userInfoUpdate)
              await API.Storage.set({userList: userListUpdate})
            }else{
              let index = userListUpdate.findIndex(item => item.userid == userInfoUpdate.userid)
                if (index == -1){
                  userListUpdate.push(userInfoUpdate)
                await API.Storage.set({userList: userListUpdate})
                  
                }else{
                  userListUpdate[index].timeStamp = userInfoUpdate.timeStamp
                   await API.Storage.set({userList: userListUpdate})
                }
            }
          }
      getUserInfo()
      ruleFormRef.resetFields()
      loginShow.value = false
      } else {
        $('.codeinput input').css('border','1px solid red')
        codeError.value = true
        ElMessage.error({ message: `失败:登陆失败:${res.data.msg}`, duration: 3000, showClose: true });
      }

    }
    const deletePhone = async (pho) => {
      let updateUserList =  infoList.filter(item=> item.userid != pho.userid)
      await  API.Storage.set({userList: updateUserList})
      getUserInfo()
    }
    const changeAccount =  async (item) => {
        await  API.Storage.set({userInfo: item})
        getUserInfo()
        // location.reload();
    }
    const loginClose = async (ruleFormRef) =>{
      loginShow.value = false
      loginForm.value = { phone: null, code: '', keep: ['记住用户名'] }
      checkPhone.value = userInfo.id ? true : false
      ruleFormRef.resetFields()
      ruleFormRef.clearValidate()
    }
    const getUserInfo = async () => {
      let userInfoStore  =  await  API.Storage.get('userInfo')
      // console.log('userInfoStore: ', userInfoStore);
      let userListStore  =  await  API.Storage.get('userList')
      // console.log('userListStore: ', userListStore);
      userList.self = userListStore || []
      // console.log('userList.self: ', userList.self);
        userInfo.value = userInfoStore || {}
        // console.log('userInfo.value: ', userInfo.value);

      checkPhone.value = userInfo.id ? true : false
      // console.log('userInfo.userid: ', userInfo.userid);
      // 去除当前账户的userList
      infoList.self  =  userList.self.filter(item => item.userid !=  userInfoStore.userid)
      // console.log('infoList: ', infoList.self)
    }
    onBeforeMount(async () => {
      getUserInfo()
    })

defineExpose({
  loginShow,
  checkPhone
})

</script>



<style lang="scss" scoped>

@import '../css/sass/loginpanel.scss';

</style>
