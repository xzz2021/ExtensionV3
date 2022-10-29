/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-26 10:58:38
 */
import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const userStore = defineStore('userInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        location: { lx:60, ly:120 },
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
        diagnosisShow: false,
        diagnosisData: {shopUrl:'',shopName:'',sumData: [],detailData:[]}
      }
    },
    persist: true,
      actions: {
        increment() {
          this.count++
        },
    },
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