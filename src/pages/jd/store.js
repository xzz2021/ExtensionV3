/*
 * @Date: 2022-11-02 14:10:50
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-02 14:16:47
 */

// import { defineStore } from 'pinia'
import { userStore } from '../../stores/userStore'

export const jdStore = defineStore('jdStore', () => {
  const user = userStore()

  const summary = computed(() => {
    return `Hi ${user.name}, you have ${state.list.length} items in your cart. It costs ${state.price}.`
  })

  function purchase() {
    return apiPurchase(user.id, this.list)
  }

  state: () => {
    return { }
  }
  return { summary, purchase }
})