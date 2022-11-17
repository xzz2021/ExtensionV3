/*
 * @Date: 2022-11-17 11:40:06
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-17 12:02:15
 */






const allowLog = true
export default {
    install:(app, options) => {
        if (allowLog) {
          try {
            app.config.globalProperties.xzz=(msg) =>  console.log(`%c${msg}`,'color:#0f0;')
          } catch (error) {
            console.warn("fail console proxy")
            app.config.globalProperties.log = function () {}
          }
        }
   }
}   