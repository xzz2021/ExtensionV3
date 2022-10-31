/*
 * @Date: 2022-10-31 08:40:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-31 13:51:34
 */

const rest = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`I rest for ${time} seconds`)
        }, time * 1000);
    })
}
export default {rest}
