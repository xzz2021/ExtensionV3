/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-01 14:34:28
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        info_id: 0,
        diagnosisStore:{
          show: false,
          percentage: 70,
          info_id: 0,
          diagnosisData: {},
        },
        currentHref:  window.location.href,
        userInfo: {
          userid: '',
          userToken: '',
          userPhone: '',
          timeStamp: ''
        },
        proBar: {
          show: false,
          percentage: 0
        }
        // userList: [{
        //   userid: '',
        //   userToken: '',
        //   userPhone: '',
        //   timeStamp: ''
        // }],
      }
    },
    // persist: true, //持久化
      actions: {  //支持异步
        increment() {
          this.count++
        },
        // //自动获取当前登录用户信息挂载到store里
        // async getUserinfo(){
        //   this.userInfo = await API.Storage.get('userInfo')
        // },
        // //自动获取用户信息列表,即历史登录记录并挂载到store里
        // async getUserlist(){
        //   this.userList = await API.Storage.get('userList')
        // },
        //自动更新当前登录用户信息并挂载到store里,配合账号切换功能
        // async updateUserinfo(){
        //   let aaa = await API.Storage.get('userInfooo')
        //   console.log('aaa: ', aaa == '');
        // }
    },
    getters: {
      // diagnosisData2: (state) => {
      //   return API.isExpired(state.diagnosisData.timeTamp, 5) ? diagnosisData : {}
      // }
    }
  
  })

export const userStore = defineStore('userInfo', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      count: 0,
      location: { lx: 60, ly: 120 },
      // userInfo: {
      //   userid: '',
      //   userToken: '',
      //   userPhone: '',
      //   timeStamp: ''
      // },
      // userList: [{
      //   userid: '',
      //   userToken: '',
      //   userPhone: '',
      //   timeStamp: ''
      // }],
    }
  },
  persist: true, //持久化
  actions: {  //支持异步
    increment() {
      this.count++
    },
  },
  getters: {
  }
})

//--------拿到响应式数据
//   const store = useUsersStore();
// const { name, age, sex } = storeToRefs(store);
//------------ 重置state-----------------
// store.$reset();
//-----------批量更改数据---------------
//store.$patch({
//   name: "张三",
//   age: 100,
//   sex: "女",
// });
//-----------------------------------

// export default { piniaStore, userStore}