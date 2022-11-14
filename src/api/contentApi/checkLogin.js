/*
 * @Date: 2022-11-14 15:42:52
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-14 15:56:16
 */



// ----------------无效-----------作用域-------------
const checkLogin = (userid) =>{
    if (userid !== '') {return ElMessage.error({ message: '请登录账号', duration: 1500 })}
}

export default {checkLogin}
