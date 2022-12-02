<!--
 * @Date: 2022-11-03 16:16:46
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-11-17 15:41:02
-->
<template>
  <vxe-modal className="titleToolsModal" :maskClosable="false" @hide="closeTitleTool" v-model="titleToolsShow" width="1340" :position="{top: 45}"  >
    <template #title>
      <!-- <div class="headerSec">
        <div class="mytitle">标题组合工具</div>
      </div> -->
      


      <div class="headerSec2"> 
        <el-tooltip class="item" effect="dark" placement="bottom-start">
            
        <div class="tipContent" slot="content"><div style="margin-bottom: 3px;"> 1、淘宝搜索页搜索关键词</div>
            <div style="margin-bottom: 3px;">2、点击标题工具-数据采集</div>
            <div style="margin-bottom: 3px;">3、我们会采集当前淘宝搜索到的前48个商品的标题，统计标题内的</div>
            <div style="margin-bottom: 3px;">词根，并推荐优秀的、使用率高的词根和标题</div></div>
    <div class="tipTitle"><i class="xzzicon2-tips tipscolor"></i><span class="mytitle2">操作说明</span></div>
    </el-tooltip></div>
    <!-- <img src="https://www.junchenlun.com/static1/img/wdk/wdtitle.png" alt=""  style="height:16px;width:16px;"> -->
    </template>
    <div class="dataBox">
      <div class="grabBox">
        <div class="alltitle">{{grabTitle}}</div>
        <vxe-table width="auto" height="260" :data="allInfo" ref="table1"  size="mini" :loading="allInfo.length == 0"
        show-overflow="false" stripe  align="center" border round >
          <vxe-column type="seq" width="40" ></vxe-column>
          <vxe-column title="商品信息" width="315"  :filters="[{ data: '' }]">
           <template #default="{ row }">
            <div class="shopinfoBox">
              <img :src="row.imgsrc" alt="" style="width:60px;height:60px;">
              <div class="infoBox">
                <div class="info1">店名: {{ row.shopName }}</div>
                <div  class="info2">{{ row.title }}</div>
                <!-- <el-tooltip class="item" effect="dark" placement="bottom-start" >
                  <div slot="content">{{row.title.slice(0,35)}}<br /><br />
                  {{row.title.slice(35)}}
                  </div>
                  <div class="info2">{{ row.title }}</div>
                </el-tooltip> -->
                
              </div>
            </div>
           </template>
          </vxe-column>
          <vxe-column field="sales" title="销量" width="80"  sortable></vxe-column>
          <vxe-column field="price" title="价格" width="80" sortable></vxe-column>
          <vxe-column title="操作" width="89">
        <template #default="{ row }">
          <div class="deleteShopItem" @click="deleteItem(row.id)">删除</div>
        </template>
          </vxe-column>
        </vxe-table>
      </div>


      
       <div class="visualizeBox">
        <div class="alltitle">{{visualizeTitle}}</div>
          <vxe-table width="auto" height="260" :data="visualizeData" ref="table2"  size="mini" :loading="visualizeData.length == 0"
            show-overflow="false"  stripe :row-config="{height: 50}" align="center" border round highlight-current-row>
          <vxe-column type="seq" width="50" ></vxe-column>
          <vxe-column field="keyword" title="词根" width="105">
            <template #default="{ row }">
            <div @click="copyInfo(row.keyword)">{{row.keyword}}</div>
           </template>
          </vxe-column>
          <vxe-column field="synthesisPercentage" title="综合推荐" width="100"  sortable></vxe-column>
          <vxe-column field="sales" title="销量统计" width="100"  sortable ></vxe-column>
          <vxe-column field="count" title="词根统计" width="110"  sortable></vxe-column>
        </vxe-table>
     </div>
     <div class="filterBox">
      <div class="alltitle">过滤词组</div>
        <vxe-table width="auto" height="220" :data="filterwordsData" ref="table3" size="mini" loading
        show-overflow="false" stripe :row-config="{height: 50}" align="center" border round >
          <vxe-column field="words" title="词根" width="100"></vxe-column>
          <vxe-column title="操作" width="101">
        <template #default="{ row }">
          <div class="deleteKeyItem" @click="deleteKey(row.id)">词根删除</div>
        </template>
          </vxe-column>
        </vxe-table>
        <div class="operate">
          <div class="operateInput"> <el-input size="mini" v-model="operateKeyword" placeholder="请输入"></el-input></div>
          <div class="operateBtn">添加</div>
          <div class="operateBtn">应用</div>
        </div>
     </div>
    </div>
    <div class="divder"></div>
    <div class="keywordBox">
        <div class="recommandTitleBox">
            <div class="alltitle" >标题推荐</div>
            <div class="titleContainer"> 
              <div class="funcBtn">
                <div class="toggle"><span>综合推荐</span> <span>字数79</span> <span>
                  <el-switch  v-model="toggleValue" @change="toggleTitle(toggleValue)" active-color="#13ce66" inactive-color="#ff4040"></el-switch></span></div>
              <el-button size="small" type="primary" @click="getTitle(salesSortTitle)">销量推荐</el-button>
              <el-button size="small" type="primary" @click="getTitle(keySortTitle)">词根推荐</el-button> 
              <el-button size="small" type="primary" @click="getTitle(synthesisSortTitle)">综合推荐</el-button>
              <el-button size="small" type="primary" >一键推荐</el-button>
              <el-button size="small" type="primary" >保存记录</el-button>
              </div>
              <div> <el-input v-model="recommendTitle2" type="textarea" rows="1"></el-input></div>
              <div> <el-input v-model="allTitle" type="textarea" rows="8"></el-input> </div>
            </div>
        </div>
        <div class="colDivder"></div>
        <div class="superTitleBox">
            <div class="alltitle supertitle" >超级标题</div>
            <div class="titleContainer2"> 
              <div class="funcBtn">
              <el-button size="mini" type="primary" >功能待定</el-button>
              <el-button size="mini" type="primary" >功能待定</el-button>
              <el-button size="mini" type="primary" >功能待定</el-button>
              </div>
              <!-- <div> <el-input v-model="recommendTitle" type="textarea" rows="1"></el-input></div> -->
              <div style="margin-top:60px;"> <el-input v-model="allTitle" type="textarea" rows="8"></el-input> </div>
            </div>
        </div>
    </div>
  </vxe-modal>
</template>

<script>
// import  titleGrabData  from './titleGrabData.vue'
// import  titleVisualize  from './titleVisualize.vue'
export default {
  computed: {...BUS_mapState({BUS: (state) => state}),
  grabTitle: function (){
      return '数据采集: 采集当前搜索页前' + this.allInfo.length + '个产品'
    },
  visualizeTitle: function (){
    return '数据可视化:' + this.visualizeData.length
  },
    
  },
  // components: { titleGrabData, titleVisualize },
  data() {
    return {
      titleToolsShow: false,
      allInfo: [],
      visualizeData: [],
      wordsWithSales: [],
      filterwordsData: [],
      keySortTitle: '',
      salesSortTitle: '',
      synthesisSortTitle: '',
      recommendTitle: '',
      recommendTitle2: '',
      allTitle: '',
      toggleValue: true,
      operateKeyword: ''
    };
  },
  methods: {
    copyInfo(val){
      if(val == '') return
      let str = val + ''
      navigator.clipboard.writeText(str);
      this.$message({ message: ` '${val}' 已复制到剪切板`, type: 'success', offset: 70, duration: 2000, });
    },
    async grabData() {
      if (location.href.indexOf('Search?keyword=') == -1) return this.$message.error('请进入商品搜索页,输入关键词进行搜索');
      this.allInfo = []
      this.titleToolsShow = true
        window.scrollTo({top: 600, behavior:'smooth'})
      for(let i=0;i<7; i++){
        await sleep(1)
        window.scrollBy({top: 1200, behavior:'smooth'})
        i==2? await sleep(1): ''
      }
      let li = jq('#J_goodsList >ul>li ')
      if (li.length < 35) {
      window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'})
      li = jq('#J_goodsList >ul>li ');
        }
      let lil = li.length;
      for (let i = 0; i < lil; i++) {
        let id = i
        let imgsrc = jq(li[i]).find('.p-img a img').attr('src') || jq(li[i]).find('.ps-item a img').attr('src');
        // console.log('imgsrc: ', imgsrc);
        let price = jq(li[i]).find('.p-price i').text();
        let title = jq(li[i]).find('.p-name a em ').text().replace('京品数码', '').replace('\n', '').replace('\t', '').replace('【JD自营】【单件包邮】', '');
        let shopName = jq(li[i])  .find('.p-shop a').text();
        let aa = jq(li[i]).find('.p-commit a ').text();
        let sales = aa.includes('万') ? aa.replace('+','').slice(0, -1) * 10000 : aa.replace('+','')
        let singleInfo = {imgsrc: `https:${imgsrc}`,id, price, title, shopName, sales: +sales || 0};
        this.allInfo.push(singleInfo);
      }
      this.getKeywords()

    },
    async getKeywords(){
      this.visualizeData = []
      this.wordsWithSales = []
      // console.log('this.allInfo: -------------', this.allInfo);
      let allKeywords = []
      let lil = this.allInfo.length
      console.log('lil: ', lil);
      for (let i = 0; i < lil; i++) {
        let tit = this.allInfo[i].title;
        let url = `http://120.25.224.61:9001/word_02_info?user_id=1111&title=${tit}`;
        let { data: {word_unique: res}} = await 浏览器_跨域axios({method: 'get', url});
        allKeywords = allKeywords.concat(res);
        // ['dfg','rfhr','hrsth','hrh','rthrh','hrh'] ===>>
        // [{word:'dfg',sales:sales},{word:'dfrtyg',sales:sales},{word:'dfg',sales:sales}]
        for(const val of res) {
          this.wordsWithSales.push({ keyword: val, sales: this.allInfo[i].sales})
        }
      }

      //调用接口计算方法
     /*   let config = {
        method: 'post',
        url: 'http://120.25.224.61:9001/titleTool',
        data: {
          "goodsArray": this.wordsWithSales,
        }
      }
      let res = await 浏览器_跨域axios(config)
      console.log('123>:', res) */




      this.filterVisualizeData()  //调用本地计算方法

      // const uniqueallKeywords = [...new Set(allKeywords)]
      // let visualizeData =  [{
      //   keyword: 'nanxie',
      //   count: 15,
      //   percentage: 15/alllength,
      //   allsales: each+= each
      // }]
    },
    async  filterVisualizeData (){
        let rowInfoData = this.wordsWithSales
        let allength = rowInfoData.length
        let filterData = []
        rowInfoData.forEach(item => {
    let newkeyList = filterData.find((i) => i.keyword == item.keyword) 
    if (!newkeyList) {
        filterData.push({ keyword: item.keyword, sales: item.sales, count: 1 })} 
    else {
        newkeyList.sales += item.sales
        newkeyList.count ++
    }})
        // filterData.forEach( item => { item.keyPercentage = ~~(item.count *10000/allength)})
        let allSales = filterData.map(item=> item.sales).reduce((a, b) => a + b, 0)
        filterData.forEach(
          item => {
            item.keyPercentage = ~~(item.count *10000/allength)
            item.salesPercentage = ~~(item.sales * 10000/allSales)
            item.synthesisPercentage = item.keyPercentage + item.salesPercentage
            // item.synthesisPercentage = _.floor((item.keyPercentage + item.salesPercentage) /100, 2)
          })
        this.visualizeData = filterData
        // console.log('filterData: ', filterData);
        this.getAllTitile(filterData)
    },
    getAllTitile(aa){
      const sortBy = (arr, k) => arr.concat().sort((b, a) => (a[k] > b[k] ? 1 : a[k] < b[k] ? -1 : 0))
      this.keySortTitle =  sortBy(aa, 'count').map(item=> item.keyword).slice(0,15).join(' ')
      this.salesSortTitle = sortBy(aa, 'sales').map(item=> item.keyword).slice(0,15).join(' ')
      this.synthesisSortTitle = sortBy(aa, 'synthesisPercentage').map(item=> item.keyword).slice(0,15).join(' ')
      this.recommendTitle = this.keySortTitle
      this.recommendTitle2 = this.keySortTitle
      this.allTitle = '词根推荐:' + this.keySortTitle + '\n' + '销量推荐:' + this.salesSortTitle + '\n' + '综合推荐:' + this.synthesisSortTitle
    },
    getTitle(key){
      this.recommendTitle = key
      this.recommendTitle2 = key
    },
    toggleTitle(val){
      this.recommendTitle2 = this.recommendTitle
      this.recommendTitle2 = val ? this.recommendTitle2 : this.recommendTitle2.replace(/\s*/g, '')

    },
    deleteItem(id){
      // this.visualizeData = []
      this.allInfo = this.allInfo.filter(item => item.id != id)
      this.getKeywords()
    },
    closeTitleTool(){
      this.$refs.table1.clearData()
      this.$refs.table2.clearData()
      this.$refs.table3.clearData()
      this.filterwordsData = []
      this.visualizeData = []
      this.recommendTitle = ''
      this.recommendTitle2 = ''
      this.allTitle = ''
      // console.log('this.$refs: ', this.$refs);
    }
  },
  mounted() {
    // 阻止背景穿透滚动
      // jq('body').css({ "overflow-x":"hidden", "overflow-y":"hidden" })
    // this.grabData();
  },
};
</script>

<style lang="scss" scoped>
@import '../../css/sass/titleTools.scss';
.dataBox {
  height: 420px;
  display: flex;
  .grabBox{
    .shopinfoBox{
      display: flex;
    }
  }
}
.collectWord{
  width: 800px;
}
</style>
