/*
 * @Date: 2022-11-03 13:56:23
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-03 14:07:02
 */
//定义获取京东浏览记录的后端数据请求


//提取相同日期的数据组成nested array
const filterDate = (dataArr) => {
    // 提取所需基础数据     //解构新对象
        let newArr = [];
        //通过forEach循环数组
        dataArr.forEach((item, i) => {
          let index = -1;
          //然后在跑到这里筛选 根据不同的时间放置不同的数组    some（）用来查找数组中是否存在某个值  如果存在 就return true
          let isExists = newArr.some((newItem, j) => {
            if (item.date == newItem.date) {

              index = j;
              return true;
            }
          })
          if (!isExists) {
            newArr.push({
              date: item.date,
              scanInfo: [item],
            });
          } else {
            newArr[index].scanInfo.push(item);
          }
        })
        return newArr
}

// 获取浏览记录
const  getScanData = async (userid,userToken)  => {
      if (!userid) return  console.log('userid不存在');
        let config = {
        url: 'http://pddzd.junchenlun.com//?s=Jd.StoreBrowse.recordList',
        data: {
          user_id: userId,
          token: userToken,
          page: 1,
          limit: 30
        }   //qs将对象 序列化成URL的形式，以&进行拼接
      }
      let res = await API.myfetch(url,config)
      let scanData = res.data.data.list
      // console.log('--------------scanData:------------ ', scanData);
      return filterDate(scanData)
        //---------------------------------------
      
  }