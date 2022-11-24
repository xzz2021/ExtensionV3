/*
 * @Date: 2022-11-23 17:05:18
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-23 17:11:28
 */
const getSmsCode  = async (obj) => {
    let config = {
        url: '?s=Home.Account.sendCode',
        method: 'post',
        body: obj
        }

      let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg)
  console.log('----验证码发送返回数据---------',res)
  // if(res.indexOf('后端服务器错误') != -1) { return ElMessage.error({ElMessage: '服务器错误,请联系后端api管理员', duration: 1000, showClose: true})}
  if (res.ret == 200 && res.msg == '') {
    ElMessage.success({ message: '验证码发送成功:请查收!', duration: 1500 })
  } else {
    ElMessage.error({ message: `验证码发送失败,原因:${res.data.msg}`, duration: 1500 })
  }
}

export default {getSmsCode}