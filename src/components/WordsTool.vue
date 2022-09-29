<template>
<div id="keywordstool">


<vxe-modal  className="wordstool modifytool" :showHeader="false" @hide="clearWordsTool" v-model="openTool" width="870px" height="550px"
      :position="{top: 100}"  marginSize="-700" >
      <div class="toolcontainer">
        <el-collapse v-model="collapseActive"  >
            <el-collapse-item name="aa">
                <template #title><div class="collapseHeader"><div class="headerTitle">{{headerTitle}}</div> <div class="setting">条件设置</div></div></template>
              <div class="calculateBox">
                <div class="content ">
                    <div class="caption">单品近7天总流量</div>
                    <div class="inputBox"><el-input v-model.number="sum" @blur="calculate1" size="small"  placeholder="请输入单品近7天总流量"></el-input></div></div>
                <div class="divider"></div>
                <div class="content ">
                    <div class="caption">单品近7天日均流量</div>
                    <div :class="result1 == '*N'? 'rawRes' : 'trueRes'">{{result1.value}}</div></div>
                <div class="divider"></div>
                <div class="content">
                    <div class="caption">同行同层平均转化率</div>
                    <div class="inputBox">
                        <el-input v-model.number="ratio" @blur="calculate2" size="small"  placeholder="请输入">
                          <template #suffix>
                            <i  class="xzzicon-bfb"></i></template></el-input></div></div>
                <div class="divider"></div>
                <div class="content ">
                    <div class="caption">核算单量结果</div>
                    <div :class="result2 == '*N'? 'rawRes' : 'trueRes'">{{result2}}</div></div>
                </div>
            </el-collapse-item>
        </el-collapse>
        <div class="wordsBox">
          <el-input type="textarea"
           v-model="mytextarea" 
           @focus="openTip = true" 
           :autosize="{ minRows: 1, maxRows: 10}"
           placeholder="请输入全标题"></el-input></div>
        <div  class="wordsTip">{{openTip? "请用'Enter键'手动分解词组": ''}}</div>
        <!-- <div v-else class="wordsTip"></div> -->
        <div class="wordsBtn" @click="confirm">确定</div>
        <div class="closeSec"><div class="close" @click="clearWordsTool"><i class="xzzicon-close" ></i></div></div>
      </div>
    </vxe-modal>
    <vxe-modal  className="wordsResult" :showHeader="false" @hide="clearWordsTool" v-model="openResult" maskClosable width="1000" height="860"
      :position="{top: 50}" >
      <div class="resultcontainer">
        <div class="topTitlie">组合补单关键词</div>
        <div class="topClose" @click="openResult = false"><i class="xzzicon-close" ></i></div>
        <div class="resultBox">
      <div class="resultOne">
        <div class="topFunSection">
          <div class="myfunction"><span @click="modifyTitle">编辑标题</span><span @click="clearKeys">清空属性词</span></div>
          <div class="mykey"><div class="currentKey">{{currentKey}}</div><div class="keyNote">当前核心词</div></div>
        </div>
        <div class="keyWordSection">
          <div style="width:250px">
          <div :class="index == isActive? 'eachWord selected':'eachWord'" v-for="(item, index) in rawKeysList.value" :key="index">
            <div class="eachKey">{{item}}</div><div class="eachNote" @click="setKey(item,index)">设置为主核心词</div>
          </div>
          </div>
        </div>
      </div>
      <div class="resultTwo">
          <div class="divider"></div>
        <div class="arrFunSection">
          <div class="arrSelect">
            <el-select v-model="optValue" @change="select" style="width: 240px;" size="small" placeholder="词组选择(长度中不包含核心词)">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="arrFun">
            <span @click="clearArr">清空结果</span>
            <span @click="copyAll">一键复制</span>
            <!-- <span >下载表格</span></div> -->
            <span @click="downloadSheet">下载表格</span></div>
        </div>
        <div class="arrListSection" >
            <div class="allArr" v-for="(item, index) in finallyArr.value" :key="index">
              <div class="divider"></div>
              <div class="wordsBox">
                <div>{{item[0]}}</div><div>{{item[1]}}</div><div class="copyBtn" @click="copyKeys(item[0],item[1])">复制</div>
              </div>
            </div>
          </div>
          </div>
          </div>
      </div>
    </vxe-modal>
    </div>
</template>
<script setup>
  const openTool = ref(false)
  const openResult = ref(false)
  const openTip = ref(false)
  const collapseActive = ref('aa')
  const headerTitle = ref('标题分词')
  const toolHeight = ref('648px')
  const result1 = ref('*N')
  const result2 = ref('*N')
  const isActive = ref(null)
  const sum = ref('')
  const ratio = ref('')
  const mytextarea = ref('')
  const optValue = ref('')
  const currentKey = ref('')
  const arrToStr = ref('')
  const rawKeys = reactive([])
  const rawKeysList = reactive([])
  const finallyArr = reactive([])
  const excelArr = reactive([])
  const arr1 = reactive([])//使用后可以不用.value赋值
  const arr2 = reactive([])
  const arr3 = reactive([])
  const arr4 = reactive([])
  const options = reactive([{
          value: 'one',
          label: '一词组合(适合成熟产品)'
        },
        {
          value: 'two',
          label: '二词组合(适合产品中上基础)'
        },
        {
          value: 'three',
          label: '三词组合(适合产品中下基础)'
        },
        {
          value: 'four',
          label: '四词组合(适合新品刚上架)'
        }])

   const   calculate1 = () => {
      sum.value == ''? result1.value ='*N' : result1.value =Math.floor(sum / 7 * 100)/100
      calculate2()
    }
   const   calculate2 = () => {
      sum.value == '' || ratio == ''? result2.value ='*N' : result2.value = Math.floor(result1.value * ratio/100 *100 )/100
    }
   const   confirm = () => {
      openTip.value = false
      let aa = mytextarea.value
      // //----------用逗号替换空格---------借逗号转成数组---------去除为空的项-------去除每一项的空格---
      // let str = aa.replace(/\n/g,",").split(',').filter(str => str.trim()).map(str => str.replace(/\s+/g,""))
      // //----------用逗号替换空格---------借逗号转成数组---------------------去除为空的项---且去除重复项--------------------要先去除每一项的空格---
      // let str = aa.replace(/\n/g,",").split(',').filter((str,i,arr) => str.trim() && arr.indexOf(str) == i).map(str => str.replace(/\s+/g,""))
        //----------用逗号替换换行-------借逗号转成数组---------去除为空的项-------------先去除每一项的空格-----------------再去除重复项---------
      let str = aa.replace(/\n/g,",").split(',').filter(str=> str.trim()).map(str => str.replace(/\s+/g,"")).filter((str,i,arr) => arr.indexOf(str) == i)
      // console.log('str: ', str);

      // if(str.length < 5 || str.length > 25) return ElMessage({
      //     message: '分词数量请保持在5位以上,25位以下',
      //     type: 'error',
      //     offset: 130,
      //     duration: 3000,
      //   });
      rawKeys.value = str
      rawKeysList.value = rawKeys.value
      openTool.value = false
      openResult.value =true

    }
   const   setKey = (item,index) => {
      clearKeys()
      rawKeysList.value = rawKeys.value
      currentKey.value = item
      isActive.value = index
      select('')
      //设置完之后调用函数-----------立即计算------所有组合-------
      caculateAllcombine(item)
    }
   const   clearKeys = () => {
      currentKey.value = ''
      rawKeysList.value = []
      optValue.value = ''
      isActive.value = null
      arr1.value = []
      arr2.value = []
      arr3.value = []
      arr4.value = []
      clearArr()
      ElMessage.success({  message: '操作成功', offset: 70, duration: 1500, });
    }
   const   clearArr = () => {
      select('')
      optValue.value = ''
      excelArr.value = []
    }
   const   modifyTitle = () => {
      toolHeight.value = ''
      openTool.value = true
      // toolWidth = '870px'
      whiceTool.value = false
      headerTitle.value = '编辑标题'
    }
      //    myarr.push(item1)
      // myarr.push(String.fromCharCode(9))
      // myarr.push(item2)
   const   copyKeys = (item1,item2) => {
      item2 == undefined ? item2 = '' : ''
      let str = item1 + String.fromCharCode(9) + String.fromCharCode(9) + item2
      //复制内容到剪切板
      navigator.clipboard.writeText(str);
      ElMessage({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        })
    }
   const   copyAll = () => {
      if(arrToStr.value == '') return  ElMessage({
          message: '数据是空的,请检查后再试!',
          type: 'error',
          offset: 70,
          duration: 1500,
        });
        
      navigator.clipboard.writeText(arrToStr.value);
      ElMessage({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        });
    }
   const   select = (e) => {
      switch(e){
        case '':      finallyArr.value = [];
                      arrToStr.value = ''
          break;
        case 'one':   arrAddExcel(arr1); 
                      finallyArr.value = spArr(arr1);
                      excelArr.value = arr1.value
          break;
        case 'two':   arrAddExcel(arr2); 
                      finallyArr.value = spArr(arr2);
                      excelArr.value = arr2.value
          break;
        case 'three':  arrAddExcel(arr3); 
                      finallyArr.value = spArr(arr3);
                      excelArr.value = arr3.value
          break;
        case 'four':  arrAddExcel(arr4);
                      finallyArr.value = spArr(arr4);
                      excelArr.value = arr4.value
      }

      finallyArr == '' || ElMessage({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        })

    }
   const   caculateAllcombine = (key) => {
      // 得到剔除关键词的初始arr
        let arr = rawKeysList.value.filter((str) =>  str != key)
        // console.log('arr: ', arr);
        let ll = arr.length
        //得到----一词-------
        // let myarr = 
        arr.forEach(ele => arr1.push(key + ' ' + ele))
          // arr1 = spArr(arr1)
        // console.log('arr1: ', arr1);
        //得到------二词--------
         for(let l = 1; l< ll; l++){
            for (let i = l; i < ll; i++) { 
              arr2.push(key + ' ' + arr[l-1] + ' ' + arr[i]) 
            }
          }
              // console.log('---origin-----arr2: ', arr2);
          // arr2 = spArr(arr2)
              // console.log('----------arr2: ', arr2);
          //得到----三词-------
          for( let m = 0; m< ll-2; m++){
            for(let l = 1; l< ll-1 -m; l++){
                for (let i = l; i < ll-1 -m; i++) { 
                  arr3.push(key + ' ' + arr[0+m] + ' ' + arr[l+m] + ' ' + arr[i+m+1]) 
                }
              }
          }

          //得到----四词----------通用函数--方法----

            let myArr4 =  choose(arr,4)
            // console.log('myArr4: ', myArr4);
            arr4.value = myArr4.map(item =>key + ' ' +  item.join(' '))
            // console.log('arr4: ', arr4);
    }
   const   spArr = (arr)  => { //arr是你要分割的数组，num是以几个为一组
        let newArr = []         //首先创建一个新的空数组。用来存放分割好的数组
        for (let i = 0; i < arr.length;) { //注意：这里与for循环不太一样的是，没有i++
          newArr.push(arr.slice(i, i += 2));
        }
        return newArr
      }
   const   choose = (arr, size)  => {
    let allResult = [];

    (function aa(arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    aa(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);

    return allResult;
}
  const arrAddExcel= (arr) =>{
    let temp = []
    arr.map((ele, index) => {
    if (index % 2 == 0) {
        temp.push(...[ele, String.fromCharCode(9), String.fromCharCode(9)])
    }else{
        temp.push(...[ele, String.fromCharCode(10)])
    }
})
     arrToStr.value = temp.join('')
     console.log('-----------------str:-------------- ', arrToStr.value)
  }
 const clearWordsTool = () => {
  openTool.value = false
  setTimeout(() => {
    headerTitle.value = '标题分词'
    mytextarea.value = ''
    // console.log('-------关闭前执行成功!!!--------');
  }, 3*60*1000);
}
 const  downloadSheet = async () => {
  // console.log('excelArr: ', excelArr);
  if(excelArr.length == 0) return ElMessage({
          message: '数据为空,请检查后再试',
          type: 'error',
          offset: 70,
          duration: 1500,
        });
      let data = {'data':JSON.stringify(excelArr)}
       let config = {
          method: 'post',
          url: 'http://pddzd.junchenlun.com/?s=Home.KeywordCombination.indata',
          data
            }
        let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg) //---------------------
      console.log('------myfetchmyfetch--------res: ', res)
        if(res.data.data.key != undefined){
          // console.log('res: ', res);
           let url =  'http://pddzd.junchenlun.com/?s=Home.KeywordCombination.export&key=' + res.data.data.key
           let msg = {type: 'downloads', url}
           let res = await API.sendMessage(msg)// 调用下载
        }else{
          ElMessage({
          message: '后端请求出错,请检查参数',
          type: 'error',
          offset: 70,
          duration: 1500,
        })
        }

        
} 
  onMounted(() => {
    API.emitter.on('iwantkey', ()=> openTool.value = true)
    })
</script>
<style lang='scss' scoped>
@import '../css/sass/wordstool.scss';
.mybtn{
  position: absolute;
  top: 100px;
  left: 100px;
}


</style>