<template>
  <div class="jclLogin">
      <el-dialog  v-model="dialogVisible2" title="切换账号" width="400px"  center>
     <div style="margin:0 auto;">您当前登录的账号是:</div>
     <div style="margin:0 auto; height:70px"></div>
     <div style="margin:0 auto; font-size:20px;text-align: center;color:red">{{userAccount}}</div>
     <div style="margin:0 auto; height:70px"></div>
     <div class="changeAccount" @click="goToLogin">切换账号</div>
    </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'HasLogin',
  data() {
    return {
      userAccount: '数据有误,请重新登录',
      dialogVisible2: false,
      
    };
  },
  methods: {
    goToLogin(){
        this.dialogVisible2 = false;
      this.$myBus.$emit('iwantlogin')
    }
  },
  async created() {
   let userPhone = await 浏览器_get_storage('userPhone')
  //  let userPhone = ''
      //  let user_id = await 浏览器_get_storage('user_id')
    // console.log('获得phone',userPhone)
    if(userPhone){ this.userAccount = userPhone + ''
    // console.log('是否存在判断',this.userAccount)
    }
    // console.log('获得展示的phone',this.userAccount)


  },
   mounted() {
    this.$myBus.$on('iwantchangeAccount', () => {
        this.dialogVisible2 = true;
      })
       
  },
};
</script>
<style lang="scss">
@import '../css/sass/loginpanel.scss';
</style>
