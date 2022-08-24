<template>
<div>
  <el-button type="primary" @click="openTool = true" class="mybtn">补单关键词</el-button>
    <vxe-modal  :className="whiceTool? 'wordstool':'wordstool modifytool'" :showHeader="false" v-model="openTool" :width="toolWidth" :height="toolHeight"
      :position="{top: 100}"  >
      <div class="toolcontainer">
        <el-collapse :value="['aa']"  >
            <el-collapse-item name="aa">
                <template slot="title"><div class="collapseHeader"><div class="headerTitle">{{headerTitle}}</div> <div class="setting">条件设置</div></div></template>
              <div class="calculateBox">
                <div class="content ">
                    <div class="caption">单品近7天总流量</div>
                    <div class="inputBox"><el-input v-model.number="sum" @blur="calculate1" size="mini"  placeholder="请输入单品近7天总流量"></el-input></div></div>
                <div class="divider"></div>
                <div class="content ">
                    <div class="caption">单品近7天日均流量</div>
                    <div :class="result1 == '*N'? 'rawRes' : 'trueRes'">{{result1}}</div></div>
                <div class="divider"></div>
                <div class="content">
                    <div class="caption">同行同层平均转化率</div>
                    <div class="inputBox">
                        <el-input v-model.number="ratio" @blur="calculate2" size="mini"  placeholder="请输入">
                            <i slot="suffix" class="meIconfont meicon-bfb"></i></el-input></div></div>
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
        <div class="closeSec"><div class="close" @click="openTool = false"><i class="meIconfont meicon-close" ></i></div></div>
      </div>
    </vxe-modal>
    <vxe-modal  className="wordsResult" :showHeader="false" @hide="clearWordsTool" v-model="openResult" maskClosable width="1000" height="860"
      :position="{top: 50}" >
      <div class="resultcontainer">
        <div class="topTitlie">组合补单关键词</div>
        <div class="resultBox">
      <div class="resultOne">
        <div class="topFunSection">
          <div class="myfunction"><span @click="modifyTitle">编辑标题</span><span @click="clearKeys">清空属性词</span></div>
          <div class="mykey"><div class="currentKey">{{currentKey}}</div><div class="keyNote">当前核心词</div></div>
        </div>
        <div class="keyWordSection">
          <div style="width:250px">
          <div :class="index == isActive? 'eachWord selected':'eachWord'" v-for="(item, index) in rawKeysList" :key="index">
            <div class="eachKey">{{item}}</div><div class="eachNote" @click="setKey(item,index)">设置为主核心词</div>
          </div>
          </div>
        </div>
      </div>
      <div class="resultTwo">
          <div class="divider"></div>
        <div class="arrFunSection">
          <div class="arrSelect">
            <el-select v-model="optValue" @change="select" size="mini" placeholder="词组选择(长度中不包含核心词)">
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
            <span @click="downloadSheet">下载表格</span></div>
        </div>
        <div class="arrListSection" >
            <div class="allArr" v-for="(item, index) in finallyArr" :key="index">
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
    <!-- <vxe-modal  className="modifytool" v-model="" width="1000" height="648"
      :position="{top: 50}" >
    </vxe-modal> -->
</div>
</template>
<script>
export default {

  data() {
    return {
        openTool: false,
        whiceTool: true,
        openResult: false,
        toolWidth: '1000px',
        toolHeight: '648px',
        headerTitle: '标题分词',
        openTip: false,
        result1: '*N',
        result2: '*N',
        sum: '',
        ratio: '',
        mytextarea: '',
        optValue: '',
        options:[
          {
          value: 'one',
          label: '一词组合(适合成熟产品)'
        },
        {
          value: 'two',
          label: '二词组合(适合成熟产品)'
        },
        {
          value: 'three',
          label: '三词组合(适合成熟产品)'
        },
        {
          value: 'four',
          label: '四词组合(适合成熟产品)'
        }
        ],
        rawKeys:[],
        rawKeysList: [],
        currentKey: '',
        isActive: null,
        arr1: [],
        arr2: [],
        arr3: [],
        arr4: [],
        finallyArr: [],
        arrToStr: '',
        excelArr: []
    }
  },
  methods: {
    calculate1(){
      this.sum == ''? this.result1 ='*N' : this.result1 = Math.floor(this.sum / 7 * 100)/100
      this.calculate2()
    },
    calculate2(){
      this.sum == '' || this.ratio == ''? this.result2 ='*N' : this.result2 = Math.floor(this.result1 * this.ratio *100)/100
    },
    confirm(){
      this.openTip = false

      let aa = this.mytextarea
      // //----------用逗号替换空格---------借逗号转成数组---------去除为空的项-------去除每一项的空格---
      // let str = aa.replace(/\n/g,",").split(',').filter(str => str.trim()).map(str => str.replace(/\s+/g,""))
      // //----------用逗号替换空格---------借逗号转成数组---------------------去除为空的项---且去除重复项--------------------要先去除每一项的空格---
      // let str = aa.replace(/\n/g,",").split(',').filter((str,i,arr) => str.trim() && arr.indexOf(str) == i).map(str => str.replace(/\s+/g,""))
        //----------用逗号替换换行-------借逗号转成数组---------去除为空的项-------------先去除每一项的空格-----------------再去除重复项---------
      let str = aa.replace(/\n/g,",").split(',').filter(str=> str.trim()).map(str => str.replace(/\s+/g,"")).filter((str,i,arr) => arr.indexOf(str) == i)
      // console.log(str)
      if(str.length < 5 || str.length > 25) return this.$message({
          message: '分词数量请保持在5位以上,25位以下',
          type: 'error',
          offset: 130,
          duration: 3000,
        });
      this.rawKeys = str
      this.rawKeysList = this.rawKeys
      this.openTool = false
      this.openResult =true
      // console.log(str1)
      // console.log(str2)

    },
    setKey(item,index){
      this.clearKeys()
      this.rawKeysList = this.rawKeys
      this.currentKey = item
      this.isActive = index
      //设置完之后调用函数-----------立即计算------所有组合-------
      this.caculateAllcombine(item)
      //得到----四词-------
        // let arr = this.rawKeysList.filter((str) =>  str != item)
        //     let myArr4 =  this.choose(arr,4)
        //     console.log('myArr4: ', myArr4);
        //     this.arr4 = myArr4.map(i => item + i.join(' '))
        //     console.log('this.arr4: ', this.arr4);


    },
    clearKeys(){
      this.currentKey = ''
      this.rawKeysList = []
      this.optValue = ''
      this.arr1 = []
      this.arr2 = []
      this.arr3 = []
      this.arr4 = []
      this.$message({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        });
       
    },
    clearArr(){
      this.select('')
      this.optValue = ''
    },
    modifyTitle(){
      this.toolHeight = ''
      this.openTool = true
      this.toolWidth = '870px'
      this.whiceTool = false
      this.headerTitle = '编辑标题'
    },
    copyKeys(item1,item2){
      item2 == undefined ? item2 = '' : ''
      let str = item1 + ' ' + item2
      //复制内容到剪切板
      navigator.clipboard.writeText(str);
      this.$message({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        });
    },
    copyAll(){
      if(this.arrToStr == '') return  this.$message({
          message: '数据是空的,请检查后再试!',
          type: 'error',
          offset: 70,
          duration: 1500,
        });
      navigator.clipboard.writeText(this.arrToStr);
      this.$message({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        });
    },
    select(e){
      // switch(e){
      //   case '':      this.finallyArr = [];
      //                 this.arrToStr = ''
      //     break;
      //   case 'one':   this.arrToStr = this.arr1.join(' '); 
      //                 this.finallyArr = this.spArr(this.arr1);
      //                 this.excelArr = this.arr1
      //     break;
      //   case 'two':   this.arrToStr = this.arr2.join(' '); 
      //                 this.finallyArr = this.spArr(this.arr2);
      //                 this.excelArr = this.arr2
      //     break;
      //   case 'three': this.arrToStr = this.arr3.join(' '); 
      //                 this.finallyArr = this.spArr(this.arr3);
      //                 this.excelArr = this.arr3
      //     break;
      //   case 'four':  this.arrToStr = this.arr4.join(' ');
      //                 this.finallyArr = this.spArr(this.arr4);
      //                 this.excelArr = this.arr4
      // }
      //  console.log('---------this.finallyArr:------ ', this.finallyArr);
      //  console.log('---------this.arr2: ', this.arr2);
      this.finallyArr == '' || this.$message({
          message: '操作成功',
          type: 'success',
          offset: 70,
          duration: 1500,
        })

    },
    caculateAllcombine(key){
      // 得到剔除关键词的初始arr
        let arr = this.rawKeysList.filter((str) =>  str != key)
        console.log('arr: ', arr);
        let ll = arr.length
        //得到----一词-------
        // let myarr = 
        arr.forEach(ele => this.arr1.push(key + ' ' + ele))
          // this.arr1 = this.spArr(this.arr1)
        // console.log('this.arr1: ', this.arr1);
        //得到------二词--------
         for(let l = 1; l< ll; l++){
            for (let i = l; i < ll; i++) { 
              this.arr2.push(key + ' ' + arr[l-1] + ' ' + arr[i]) 
            }
          }
              // console.log('---origin-----this.arr2: ', this.arr2);
          // this.arr2 = this.spArr(this.arr2)
              // console.log('----------this.arr2: ', this.arr2);
          //得到----三词-------
          for( let m = 0; m< ll-2; m++){
            for(let l = 1; l< ll-1 -m; l++){
                for (let i = l; i < ll-1 -m; i++) { 
                  this.arr3.push(key + ' ' + arr[0+m] + ' ' + arr[l+m] + ' ' + arr[i+m+1]) 
                }
              }
          }
          // let lastArr = arr.reverse()
          //  this.arr3.push(key + ' ' + lastArr[2] + ' ' + lastArr[1] + ' ' + lastArr[0])
          // this.arr3 = this.spArr(this.arr3)

          //得到----四词----------通用函数--方法----

            let myArr4 =  this.choose(arr,4)
            // console.log('myArr4: ', myArr4);
            this.arr4 = myArr4.map(item =>key + ' ' +  item.join(' '))
            // console.log('this.arr4: ', this.arr4);
    },
    spArr(arr) { //arr是你要分割的数组，num是以几个为一组
        let newArr = []         //首先创建一个新的空数组。用来存放分割好的数组
        for (let i = 0; i < arr.length;) { //注意：这里与for循环不太一样的是，没有i++
          newArr.push(arr.slice(i, i += 2));
        }
        return newArr
      },
    choose(arr, size) {
    var allResult = [];

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
},
clearWordsTool(){
      this.toolHeight = '648px'
      this.toolWidth = '1000px'
      this.whiceTool = true
      this.headerTitle = '标题分词'
      // console.log('-------关闭前执行成功!!!--------');

},
async downloadSheet(){

  // console.log('this.excelArr: ', this.excelArr);
  if(this.excelArr == []) return this.$message({
          message: '数据为空,请检查后再试',
          type: 'error',
          offset: 70,
          duration: 1500,
        });
      let data = {'data':JSON.stringify(this.excelArr)}
       let config = {
          method: 'post',
          url: 'http://pddzdtest.junchenlun.com/?s=Home.KeywordCombination.indata',
          // data
          data
            }
          // console.log('this.arr2: ', this.arr2);
        let res = await 浏览器_跨域axios(config)
        if(res.data.data.key != undefined){
          console.log('res: ', res);
           let url =  'http://pddzdtest.junchenlun.com/?s=Home.KeywordCombination.export&key=' + res.data.data.key
           await 浏览器_url表格链接下载(url)
        }else{
          this.$message({
          message: '后端请求出错,请检查参数',
          type: 'error',
          offset: 70,
          duration: 1500,
        })
        }

        
} 
  },
  mounted() { },
  
}
</script>
<style lang='scss' scoped>
@import '../css/sass/wordstool.scss';
.mybtn{
  position: absolute;
  top: 100px;
  left: 100px;
}


</style>