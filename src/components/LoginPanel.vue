<template>
  <div class="loginPanel">
    <el-dialog :model-value="loginShow" width="820px" @closed="loginClose(ruleFormRef)" draggable  center>
    <!-- <el-button type="primary">Prima233</el-button> -->
      <div class="mainSection">
        <div class="left">
          <img class="logo" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/loginLogo.png" alt="welcome to login">
        </div>
        <div v-if="checkPhone" class="right2">
          <div class="title">
            <div class="tip">切换账号</div>
            <div class="exchangeBtn" @click="checkPhone = false">登录其他账号</div>
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
                <div class="deleteBtn" @click="deletePhone(item.userid)"><i class="funicon-loginguanbi"></i></div>
              </div>
            <el-divider></el-divider>
            </div>
            </div>
        </div>
        <div v-else class="right">
          <div class="title">谋臣界-电商工具箱</div>
          <div class="tip">一个让运营工作更高效的平台</div>
          <div class="formBox">
            <el-form  :model="loginForm"  ref="ruleFormRef" :rules="rules" >
              <el-form-item size="large" prop="phone">
                <div class="phoneSec">
                  <el-input v-model.number="loginForm.phone" placeholder="手机号" maxlength="11" />
                  <div class="dropBox" v-if="storelist.self.length">
                    <el-dropdown @command="inputAccount" placement="bottom-end">
                        <span class="el-dropdown-link"><i class="funicon-dropdown listDropdown"></i></span>
                        <template  #dropdown>
                          <el-dropdown-menu >
                            <el-dropdown-item v-for="(item, index) in storelist.self" :key="index" :command="item.userPhone">{{item.userPhone}}</el-dropdown-item>
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
//----☆☆☆☆----数组最好以对象包裹,避免调用出错及丢失响应性----☆☆☆☆-------
let infoList = reactive({self:[]})
let storelist = reactive({self:[]})
let userInfo = reactive({})
let loginForm = reactive({ phone: null, code: '', keep: ['记住用户名'] })

//校验规则
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
    //下拉选择手机号,自动赋值
    const inputAccount = (e) => {
      loginForm.phone = e
    }
    //获取验证码
    const getCode = async  (ruleFormRef) => {
      let isphoneValid
     await ruleFormRef.validateField(["phone"], (valid) => {  isphoneValid = valid })
      if (!isphoneValid) return ElMessage.error({ message: '请输入正确的手机号!', duration: 1500 })
      codetime.value = 30
      let codeInterval = setInterval(() => {
        codetime.value--
        if (codetime.value == 0) {
          clearInterval(codeInterval);
        }
      }, 1000);
      
      await API.getSmsCode({phone: loginForm.phone})
    }
    //提交登录表单
    const submitForm = async (ruleFormRef) => {
      let isValid
      await ruleFormRef.validate((valid, fields) => { isValid = valid })
      if (!isValid) return ElMessage.error({ message: '输入有误,请重试!', duration: 1500 })
      let res = await  API.submitLogin(loginForm)  
      // console.log('res:6666666666 ', res)
      if(res.ret == undefined) return codeError.value = true
      let curUserInfo =  {userid: res.data.user_id , userToken: res.data.token, userPhone: loginForm.phone} 
        await API.storeUserinfo(curUserInfo) // 存储账号信息  
        await API.storeUserlist()   // 更新用户列表
        if(loginForm.keep[0] != '记住用户名'){ API.updateUserlist(curUserInfo.userid) }
        getUserInfo() //获取更新后的信息
        loginShow.value = false
    }
    const deletePhone = async (userid) => {
      await API.updateUserlist(userid)
      getUserInfo()
    }
    const changeAccount =  async (item) => {
        await  API.Storage.set({userInfo: item})
        getUserInfo()
    }
    //关闭面板恢复初始值
    const loginClose = async (ruleFormRef) =>{
      loginShow.value = false
      loginForm.value = { phone: null, code: '', keep: ['记住用户名'] }
      checkPhone.value = userInfo.value.userid ? true : false
          // ruleFormRef.resetFields(["phone", "code"])  //需要传入重置区参数,不然报错
        if(ruleFormRef != undefined){  //没有切换到登录表单时,避免error
          // ruleFormRef.resetFields() 
          ruleFormRef.clearValidate()
        }else{
          // console.log('ruleFormRef: ', ruleFormRef); //必定undefined
        }

    }
    //从获取用户信息
    const getUserInfo = async () => {
      userInfo.value  = await API.getUserinfo()
      let id = userInfo.value.userid
      storelist.self  =  await  API.getUserlist()
      //-------------------------------拿到空值---------------???????????
      // console.log('storelist.length: ', storelist.length);  //-------reactive数组----即使赋值也会转换成代理对象数组
      infoList.self  =  storelist.self.filter(item => item.userid != id)
      checkPhone.value = id ? true :  false
    }
    onBeforeMount(async () => {
      await getUserInfo()
    })

    onMounted(() => {
      // setInterval(() => {
      //   console.log('ruleFormRef: ', ruleFormRef)
      // }, 10000);
    })

defineExpose({
  loginShow,
  checkPhone
})

</script>

<style lang="scss" scoped>
@import '../css/sass/loginpanel.scss';

</style>
