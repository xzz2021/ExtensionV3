/*
 * @Date: 2022-12-02 17:07:14
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-02 17:20:38
 */
//-----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------
//监听添加移除的公共事件
const checkLogin ={


  //未登录时的添加拦截事件
   addEvent (targetEvent) {
      let item = $('.el-dropdown')
      let item2 = $('.el-dropdown-menu')
       for(let i=0; i<item.length; i++){
        item[i].addEventListener('click',targetEvent,'capture')
      }
      for(let i=0; i<item2.length; i++){
        item2[i].addEventListener('click',targetEvent,'capture')
      }
  },
  //登录后的移除拦截事件
   removeEvent(targetEvent) {
      let item = $('.el-dropdown')
      let item2 = $('.el-dropdown-menu')
       for(let i=0; i<item.length; i++){
        item[i].removeEventListener('click',targetEvent, 'useCapture')
      }
      for(let i=0; i<item2.length; i++){
        item2[i].removeEventListener('click',targetEvent, 'useCapture')
      }
  }

}
  //----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------


  export default { checkLogin }