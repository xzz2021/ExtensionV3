import { defineStore } from 'pinia'


export const userStore = defineStore('userInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        userid: '',
        try: '22'
      }
    },
    
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