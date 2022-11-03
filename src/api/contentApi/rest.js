/*
 * @Date: 2022-10-31 08:40:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-02 14:54:18
 */

const rest = (seconds) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            resolve(`I rest for ${seconds} seconds`)
        }, seconds * 1000);
    })
}
export default {rest}
