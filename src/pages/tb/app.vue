<template>
  <div class="taobao">{{version}}</div>
</template>

<script setup>

const userstore = userStore()
const { userid, userToken, version } = storeToRefs(userstore)

//自定义V-指令,避免短时间内重复点击--------------v-disClick="3"----------------
/* const VdisClick={
  mounted: (el, binding) =>{
          el.addEventListener("click", function(){
            el.setAttribute("disabled", "disabled")
            el.setAttribute("style", "pointer-events: none")
            setTimeout(() => {
              el.removeAttribute("disabled")
              el.removeAttribute("style")
            }, binding.value * 1000);
          })
      }
}  */

  const goTOLogin = () => {
      API.emitter.emit('iwantlogin')
    }
    const backToHome = () => {
    }
      const getStorage = () => {
    chrome.storage.local.get(['userid'], (result) =>{
      // console.log('result: ------tmtmtmt-------', result)
      result == {} ? chrome.storage.local.set({userid: ''}) : userstore.userid = result.userid
    })
  }
   onUpdated(() => {
   })
   onBeforeMount(() => {
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      message == 'loginEvent'?   getStorage() : ''
      sendResponse({status: true})
      })
    getStorage()

   })
</script>

<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";

.taobao{
  position: fixed;
  top: 60px;
  left: 20px;
  width: 200px;
  height: 200px;
  background-color: rgba(104, 238, 247, 0.74);
}
</style>
