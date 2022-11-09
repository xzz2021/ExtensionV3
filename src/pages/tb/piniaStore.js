/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-09 09:26:25
 */
import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        diagnosisShow: false,
        diagnosisData: {shopUrl:'',shopName:'',sumData: [],detailData:[],timeTamp: '87234254585'}
      }
    },
      actions: {  //支持异步
        increment() {
          this.count++
        },
    },
    getters: {
      diagnosisData2: (state) => {
        return API.isExpired(state.diagnosisData.timeTamp, 5) ? diagnosisData : {}
      }
    }
  })

  export const userStore = defineStore('userInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        location: { lx:60, ly:120 },
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