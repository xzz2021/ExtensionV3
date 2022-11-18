/*
 * @Date: 2022-11-12 15:12:12
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-14 14:47:14
 */


const SHOW= {
    //调试使用
    aashow: true,
    bb: false
}







export const getShow = key => {
    if(key){
        return SHOW
    }
    else{
      for(let i in SHOW){SHOW[i] = false}
      return SHOW
    }
}