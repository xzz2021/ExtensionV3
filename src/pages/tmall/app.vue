<template>
  <div class="tmall">{{version}}
<el-button @click="storeData" >存储数据</el-button>
<el-button @click="getStore" >获取数据</el-button>

  </div>
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
const storeData = async () => {
  // let msg = {type: 'myfetch', config: { method: 'GET',headers: { 'Content-Type':'text/plain; charset=UTF-8' },responseType: 'TEXT', url: 'https://item.taobao.com/item.htm?id=664861338483&ali_refid=a3_430582_1006:1124546563:N:nrFY4XWUtZ5nELwjyJKUOQ%3D%3D:0031cb2df770684c9f9dda83c8b93241&ali_trackid=1_0031cb2df770684c9f9dda83c8b93241&spm=a230r.1.14.6#detail'}}
  // let aa = await API.sendMessage(msg)
  // console.log('aa: ', aa)
  // console.log('aa: ', aa);
  let bbb = await API.Storage.set({users: ['786464465', '8975875'], userid: '99453645697'})
  console.log('bbb: ', bbb);
}
const getStore = async () => {
 let aa = await API.Storage.get(['tyutu','users', 'userid', 'users'])

 console.log('aa: ', aa);
}

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

.tmall{
  position: fixed;
  top: 60px;
  left: 20px;
  width: 200px;
  height: 200px;
  background-color: rgba(116, 247, 104, 0.74);
}
</style>
