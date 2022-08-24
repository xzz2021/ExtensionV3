import { defineStore } from 'pinia'

export const userStore = defineStore('userInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        count: 0,
        userId: ''
      }
    },
      actions: {
        increment() {
          this.count++
        },
    },
  })