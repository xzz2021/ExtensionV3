/*
 * @Date: 2022-10-29 16:39:29
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-04 08:34:09
 */
//------------注入函数到浏览器window---------------
// window._ = _
// window.jq = $

function aa(){

    console.log('------------trytrytry-------------')
}



// aa()
window.aa = aa

