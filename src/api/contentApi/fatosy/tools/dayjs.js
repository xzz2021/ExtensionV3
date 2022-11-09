/*
 * @Date: 2022-10-15 14:04:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-15 14:18:52
 */
// const dayjs = require('dayjs')
import dayjs from "dayjs"

class zTime{
    constructor(){
        this.nowtime = dayjs()
    }

    ymdhms(){
        return dayjs().format('YYYY-MM-DD HH:mm:ss')
    }

    ymd(){
        return dayjs().format('YYYY-MM-DD')
    }

    ymd2(){
        return dayjs().format('YYYYMMDD')
    }

}

let ztime = new zTime()

export default {dayjs: dayjs(), ztime}