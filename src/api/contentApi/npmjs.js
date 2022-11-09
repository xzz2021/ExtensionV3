/*
 * @Date: 2022-10-15 14:04:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-09 08:29:24
 */
// const dayjs = require('dayjs')

// 此处定义所有外部引用的小模块
import dayjs from "dayjs"
import mitt from "mitt"

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

export default {dayjs: dayjs(), emitter:mitt(), ztime}