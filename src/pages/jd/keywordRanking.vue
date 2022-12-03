<template>
  <div class="JDrankingPanel">
    <vxe-modal v-model="dialogVisible" width="1150px" height="735px" :position="{ top: 100 }">
      <template #header>
        <div style="width:1100px; height:26px;"></div>
      </template>
      <div class="container dtttt">
        <div class="rankingheader">
          <div class="titleBox">
          <p class="headerTitle">批量查排名</p>
          <!-- <button @click="test1()">测试按钮</button> -->
          <el-tooltip class="item" effect="dark" placement="top">
                  <div class="topTip" slot="content">
                      <div style="margin-bottom: 5px;">1、选择宝贝排序方式;</div>
                      <div style="margin-bottom: 5px;">2、输入: 宝贝链接/宝贝ID;</div>
                      <div style="margin-bottom: 5px;">3、查询方式: "开始查询"为系统查询方式;"自定义查询"为目标关键词查询方式;</div>
                      <div style="margin-bottom: 5px;"> "自定义查询"为目标关键词查询方式!</div>
                  </div>
                <div class="tipTitle">(操作说明)</div>
          </el-tooltip>
          </div>

          <!-- <div v-if="percentage != 0" class="pro">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
          </div> -->
          <div class="btn" @click="dialogVisible = false; cleanData()"><i class="xzzicon-guanbi"></i></div>
        </div>
        <div class="mainxzz">
          <!-- <div class="mask" v-if="!(percentage == 0 || percentage ==100)"><div class="iamloading">正在自动查询,请稍候3~5分钟!</div></div> -->
          <div class="left">
            <el-form label-position="top" label-width="280px" :model="formData">
              <el-form-item >
                <el-radio v-model="formData.sortType" label="综合排序" border :disabled='userSearchFlag' />
                <!-- <img class="img1" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/taobao.png"/> <span style="margin-left: 5px;">手淘</span> </el-radio> -->
                <el-radio v-model="formData.sortType" label="销量排序" border :disabled='userSearchFlag' />
                <!-- <img class="img1" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/taote.png"/> <span style="margin-left: 5px;">淘宝特价版</span> </el-radio> -->
              </el-form-item>
              <!-- <el-form-item label="排序">
                      <el-radio v-model="formData.sortType" label="综合" size="small" border>
                      <img class="img1" src=""/>
                       <span style="margin-left: 5px;">综合</span> </el-radio>
                    <el-radio v-model="formData.sortType" label="销量" size="small" border>
                      <img class="img1" src=""/> 
                      <span style="margin-left: 5px;">销量</span> </el-radio>
                  
      
                  </el-form-item> -->
              <el-form-item label="宝贝链接/ID">
                <el-input v-model="formData.link" size="small" @blur="UserUrlchange()" :disabled="userSearchFlag"
                  placeholder="填写京东的单品链接或宝贝ID"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- <el-tabs v-model="tabsName" @tab-click="tabsChange()" > -->
                <el-tabs v-model="tabsName">
                  <!-- <el-tab-pane name="auto">
                    <template slot="label">
                      <el-tooltip effect="dark" content="通过自动拆分标题搜索在淘宝有排名前100位的推荐最短词组" placement="top"> <span>最佳词</span>
                      </el-tooltip>
                    </template>
                    <el-input v-model="formData.autoword" type="textarea" rows="14" placeholder="支持1个或多个推荐词,1行1个推荐词">
                    </el-input>
                  </el-tab-pane> -->
                  <el-tab-pane name="user">
                    <template slot="label">
                      <el-tooltip effect="dark" content="查询自定义输入的词组" placement="top"> <span>自定义</span></el-tooltip>
                    </template>
                    <el-input v-model="formData.userword" type="textarea" rows="14" placeholder="可以在此输入需要搜索的词 : 
支持1个或多个推荐词,1行1个推荐词"></el-input>
                  </el-tab-pane>
                  <!-- <el-tab-pane name="split">
                    <template slot="label">
                      <el-tooltip effect="dark" content="查询拆分标题得到的词组" placement="top"> <span>拆分词</span></el-tooltip>
                    </template>
                    <el-input v-model="formData.splitword" type="textarea" rows="14" placeholder="支持1个或多个拆分词,1行1个拆分词">
                    </el-input>
                  </el-tab-pane>
                  <el-tab-pane name="like">
                    <template slot="label">
                      <el-tooltip effect="dark" content="查询与标题有关联的词组" placement="top"> <span>相关词</span></el-tooltip>
                    </template>
                    <el-input v-model="formData.likeword" type="textarea" rows="14" placeholder="支持1个或多个相关词,1行1个相关词">
                    </el-input>
                  </el-tab-pane>
                  <el-tab-pane name="send">
                    <template slot="label">
                      <el-tooltip effect="dark" content="查询淘宝搜索该标题后淘宝推荐的词组" placement="top"> <span>推荐词</span>
                      </el-tooltip>
                    </template>
                    <el-input v-model="formData.sendword" type="textarea" rows="14" placeholder="支持1个或多个直通词,1行1个直通词">
                    </el-input>
                  </el-tab-pane> -->

                </el-tabs>
              </el-form-item>
              <el-form-item>
                <div class="btnSection">
                  
                  <div class="clearBtn" @click="cleanWords">清空</div>
                  <!-- <div class="clearBtn" @click="cleantable">清空列表</div> -->
                <!--<div class="searchBtn" v-if="isautoBtnOk" @click="stopSearch">停止查询</div>
                  <div class="searchBtn" v-else
                    :class="userSearchFlag == true && formData.splitword != '' ? 'noclick' : ''" @click="autoSearch"
                    :disabled="userSearchFlag">自动查询</div> -->
                  <div class="searchBtn" v-if="isBtnOk" @click="stopSearch">停止查询</div>
                  <div class="searchBtn" v-else :class="userSearchFlag == true ? 'noclick' : ''" @click="onSubmit"
                    :disabled="userSearchFlag">手动查询</div>
                  <!-- <div class="searchBtn" @click="onSubmit">查询排名</div> -->
                </div>
              </el-form-item>
            </el-form>
            <div v-if="showLogin">
              <div class="ssss" @click="showLogin = false"><i class="xzzicon-guanbi"></i></div>
              <iframe class="tetetete"
                src="https://login.taobao.com/member/login.jhtml?style=mini&newMini2=true&from=sm&full_redirect=false&redirectURL=https://s.taobao.com:443/search/_____tmd_____/page/close_iframe_page?rand=S3WxGHAgAt756EpznwfNzJq2AFA2qBNla3j6EINUS8We9dazM_iKElp8DwVSHZUevpC41Bx7RzivXIj9RnZgdg&uuid=9c4b62b62f8dbe365fc33f41017b2441&_lgt_=9c4b62b62f8dbe365fc33f41017b2441___6913___243fd973152c6b15ca6bca851fdd6e21___837b211a0c5c4d0311617da5fff37e25001413704de625b860e2518faad0f0365b7abbd7c11aab813b08bc5a2234d302f2dfc8620fe2ead96649e156b0c1c2396f9401f0c63bd365933267141a4140aef0e031931b9132ad85013eb3be5f87fd9de991d92f1176f74a12aa319edb90eb19ee2f8c8b0ebee2114336b6d75030f8a5150c80d29c3638d159e9d1e21bf430">
              </iframe>
            </div>
          </div>

          <div v-if="!UrlData.url" class="right">
            <div class="emptyBox">
              <svg class="xzzsymbol emptySymbol" aria-hidden="true"> 
            <use xlink:href="#xzzicon2-emptybox"></use>
            </svg>
              <p class="emptytip">你还未设置商品信息，请在左边设置</p>
            </div>

          </div>

          <div v-else class="right2">
            <div class="top">
              <div class="img">
                <img :src="UrlData.img" alt="">
              </div>
              <div class="detailxzz">
                <p class="title">{{ UrlData.title }}</p>
                <div class="box">
                  <!-- <div class="category">类目：流行男鞋 >> 低帮鞋 >> 休闲板鞋</div> -->
                  <div class="category">查询总数量:{{ tableData.length }}</div>
                  <div class="timestamp">查询时间:{{ searchTime }}</div>
                </div>
              </div>
            </div>
            <div class="centerSec">
              <div  class="pro">
            <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
          </div> 
          <div class="clearlistBtn" > 清空列表 </div>
          <!-- <div class="clearlistBtn" @click="cleantable"> 清空列表 </div> -->
            </div>

            <div class="table">
              <el-table :data="tableData" ref="keyResultTable" height="480" max-height="480" style="width: 100%"
                size="mini" empty-text='数据正在加载...'>
                <el-table-column type="index" :index="indexMethod" label="序号" width="50" />
                <el-table-column prop="oktime" label="完成时间" width="120" sortable />
                <!-- <el-table-column prop="goods" label="推荐状态" width="90"/> -->
                <el-table-column prop="goods" label="推荐状态" width="110" sortable :sort-by="['最佳', '次佳', '次次佳', '']">
                  <template slot="header">
                    <el-tooltip effect="dark" content="推荐评分权重分配 - 关键词长度(70%) + 排名位置(30%) " placement="top"><span>推荐状态
                        ?</span></el-tooltip>
                  </template>
                </el-table-column>
                <!-- <el-table-column prop="goods" label="推荐状态" width="90" sortable :sort-method="autoSort"/> -->
                <!-- <template #default="scope">{{tableData[scope.$index].row.goods}}</template> -->
                <el-table-column prop="keyword" label="关键词" width="200">
                  <template #default="{ row }">
                    <div @click="copyInfo(row.keyword)">{{ row.keyword }}</div>
                  </template>
                  <template slot="header">
                    <el-tooltip effect="dark" content="点击关键词可以直接复制" placement="top"><span>关键词 ?</span></el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="location" label="排名位置" width="140" />
                <el-table-column prop="operation" label="操作" width="110">
                  <template #default="row">
                    <div v-if="tableData[row.$index].location.indexOf('查询') == -1" class="resultBtn"
                      @click.prevent="showResult(row.row.keyword)">排名结果</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>

        </div>
      </div>

    </vxe-modal>
    <vxe-modal  @hide="resIndex = -1;" v-model="isrowdata" width="1150px" :position="{ top: 100 }">
      <template #header>
        <div style="width:1100px; height:26px;"></div>
      </template>
      <div class="container">

        <div class="rankingheader">
          <p class="headerTitle">宝贝详情页</p>
          <div class="btn" @click="isrowdata = false; rowtableData = []"><i class="xzzicon-guanbi"></i></div>
        </div>
        <div class="data3Box">
          <el-table :data="rowtableData" @row-dblclick="test66" :row-class-name="eltableRowClassName" height="610"
            style="width: 100%" border size="mini">
            <el-table-column prop="order" label="排名" width="80" />
            <el-table-column prop="img" label="宝贝图片" width="130">
              <template #default="scope">
                <img :src="scope.row.img" min-width="100" height="100" />
              </template>
            </el-table-column>
            <el-table-column prop="title" label="宝贝标题" width="240" />
            <el-table-column prop="id" label="宝贝ID" width="130" />
            <el-table-column prop="price" label="宝贝原价" width="120" />
            <el-table-column prop="pricerate" label="宝贝促销价" width="120" />
            <el-table-column prop="shopName" label="店铺" width="129" />
            <el-table-column prop="sold" label="付款人数" width="120" />
          </el-table>
        </div>
      </div>
    </vxe-modal>


    <!-- <MeProgress style="z-index: 1000" :show="ischeck" :percentage="percentage"></MeProgress> -->
  </div>
</template>
<script>

import { changeLinkData, getJDskuData, checkSKULoc } from './Fatosy/JDzhiRanSoSuo.js'

export default {
  name: 'keywordRanking',
  data() {
    return {
      searchType: '手动',
      // 搜索开始：true， 结束：false
      isBtnOk: false,
      isautoBtnOk: false,
      userSearchFlag: false,
      showLogin: false,
      isLogin: false,
      tabsName: 'user',
      UrlData: {
        "url": '',
        "title": '',
        "img": ''
      },
      searchTime: '',
      dialogVisible: false,
      isrowdata: false,
      percentage: 0,
      formData: {
        appType: '手机京东',
        sortType: '综合排序',
        link: '',
        userword: '',
        splitword: '',
        likeword: '',
        sendword: ''
      },
      autodata: {
        "status": 0,
        "data": [],
      },
      tableData: [],
      searchResult: [],
      rowtableData: [],
      resIndex: -1
      //tableDataStorage: []
    }
  },

  methods: {
    test66(row, col, e) {
      this.stopSearch()
      this.formData.link = row.id
      this.isrowdata = false
      this.UserUrlchange()
      console.log('row: ', row);
    },

    copyInfo(val) {
      if (val == '') return
      let str = val + ''
      navigator.clipboard.writeText(str);
      this.$message({ message: ` '${val}' 已复制到剪切板`, type: 'success', offset: 70, duration: 2000, });
    },

    async test1() {
      await changeTaoBaoTK()
    },

    // 序号递减
    indexMethod(index) {
      return this.tableData.length - index
      //return (this.params.currentPage - 1) * this.params.pageSize+ index + 1
    },

    // 停止查询标记设置
    async stopSearch() {
      this.userSearchFlag = false
      this.isBtnOk = false
      this.isautoBtnOk = false
      let change = await zsql.change("zrssStopFlag", true);
      if (change == false) {
        let add = await zsql.add("zrssStopFlag", true)
      }
      await sleep(4)
      zsql.remove('searchdata')
      this.percentage = 0;
    },

    // 开始查询标记设置
    async startSearch() {
      this.percentage = 0;
      this.userSearchFlag = true
      let change = await zsql.change("zrssStopFlag", false);
      if (change == false) {
        let add = await zsql.add("zrssStopFlag", false)
      }
    },

    // 清空所有数据
    cleanData() {


      this.userSearchFlag = false;

      this.formData.appType = '手淘';
      this.formData.link = '';
      this.formData.userword = '';
      this.formData.splitword = '';
      this.formData.compareword = '';
      this.formData.likeword = '';
      this.formData.sendword = '';
      this.formData.sortType = '综合'

      this.showLogin = false;
      this.isLogin = false;
      this.tabsName = 'user';

      this.UrlData.url = '';
      this.UrlData.title = '';
      this.UrlData.img = '';

      this.searchTime = '';
      this.dialogVisible = false;
      this.isrowdata = false;
      this.percentage = 0;

      this.tableData = [];
      this.searchResult = {
        "status": 0,
        "data": []
      };
      this.rowtableData = [];

    },

    // 根据标签页变化清空文本框
    cleanWords() {
      if (this.tabsName == 'user') {
        this.formData.userword = '';
      } else if (this.tabsName == 'split') {
        this.formData.splitword = '';
      } else if (this.tabsName == 'like') {
        this.formData.likeword = '';
      } else if (this.tabsName == 'send') {
        this.formData.sendword = '';
      }
    },

    // 生成UUID
    getUUID() {
      let result = '';
      for (let i = 0; i < 24; i++) {
        let oneNum = Math.round(Math.random() * 9).toString();
        result += oneNum;
      }
      //result = parseInt(result)
      return result;
    },

    // 开始监听抓取数据
    async watchSearchData() {
      // 自动搜索
      let st1 = setInterval(async () => {
        let sd = await zsql.get('searchdata')
        if (sd != undefined) {
          this.searchResult = sd['searchdata']
          this.percentage = parseInt(this.searchResult.status)
          if (this.searchResult.status == 100) {
            this.isBtnOk = false
            this.isautoBtnOk = false
            this.userSearchFlag = false
            this.isBtnOk = false
            this.isautoBtnOk = false
            await sleep(2)
            await zsql.remove('searchdata')
            clearInterval(st1)
          }
        }
      }, 1000);
    },

    //测试是否是纯数字
    testNum(strs) {
      let rt = new RegExp(/^\d{1,}$/);
      return rt.test(strs)
    },

    // 商品链接ID输入框失去焦点后自动查询商品详情
    async UserUrlchange() {

      // 用户修改商品ID或链接时渲染搜索词和页面数据
      // 获取商品链接/ID
      let user_link = this.formData.link;
      if (user_link != '' && (user_link.indexOf('item.jd.com') > -1 || this.testNum(user_link) == true)) {

        Message.success('开始获取商品数据！')

        this.searchTime = ztime.ymdhms()
        // 通过链接获取商品标题，主图，链接数据
        this.UrlData = await getJDskuData(user_link);
        //console.log("根据商品链接\ID获取的数据：", this.UrlData);

        // 商品数据获取正常
        if (this.UrlData.img != undefined || this.UrlData.title != undefined) {
          // 对商品标题进行自动分词以及页面渲染
          if (this.UrlData.title != undefined) {
            let skuTitle = this.UrlData.title;
          } else {
            Message.error({ message: `不存在商品！`, duration: 3000, showClose: true });
          }
        } else {
          Message.error({ message: `查无该商品！`, duration: 3000, showClose: true });
        }
      } else {
        Message.error({ message: `输入的链接不合法！`, duration: 3000, showClose: true });
      }
    },

    // 将搜索结果中others数组转为排名结果里面的页面
    async showResult(index) {
      for (let j1 = 0; j1 < this.tableData.length; j1++) {

        let tk = this.tableData[j1]['keyword']
        //console.log('tk: ', tk);
        //console.log('index: ', index);

        if (tk == index) {
          // 商品在others的位置
          let locstr = this.tableData[j1].location;
          if (locstr.indexOf('位') > -1) {
            let indexArr = locstr.match(/\d+.*?/g)
            this.resIndex = (+indexArr[0] - 1) * 10 + +indexArr[1] - 1
          }
          let others = this.tableData[j1].others;
          for (var k1 = 0; k1 < others.length; k1++) {
            let obj = others[k1];
            let order = obj.item_order;
            let img = obj.item_img;
            let title = obj.item_title;
            let id = obj.item_id;
            let price = obj.item_price;
            let pricerate = obj.item_price_rate;
            let shop = obj.item_shop;
            let sold = obj.item_month_sold;
            let nowobj = {
              "order": order,
              "img": img,
              "title": title,
              "id": id,
              "price": price,
              "pricerate": pricerate,
              "shopName": shop,
              "sold": sold
            }
            this.rowtableData.push(nowobj)
          }
        }
      }
      this.isrowdata = true
      if (this.resIndex < 5) return
      //console.log('this.resIndex: ', this.resIndex);
      setTimeout(() => {
        jq('.data3Box .el-table__body-wrapper').scrollTop(114 * (this.resIndex - 2))
        if (jq('.data3Box .el-table__body-wrapper').scrollTop() == 0) {
          setTimeout(() => {
            jq('.data3Box .el-table__body-wrapper').scrollTop(114 * (this.resIndex - 2))
          }, 10)
        }
      }, 50)


    },

    eltableRowClassName({ row, rowIndex }) {
      //console.log('this.resIndex: ', this.resIndex);
      if (this.resIndex == -1) return
      if (rowIndex === this.resIndex) {
        return 'success-row'
      }
    },

    // 手动搜索
    async onSubmit() {

      // 获取商品链接/ID
      let user_link = this.formData.link;
      // 根据标签页获取商品搜索词
      let user_desc = this.formData.userword;
      if (this.tabsName == 'user') {
        user_desc = this.formData.userword;
      } else if (this.tabsName == 'split') {
        user_desc = this.formData.splitword;
      } else if (this.tabsName == 'compare') {
        user_desc = this.formData.compareword;
      } else if (this.tabsName == 'like') {
        user_desc = this.formData.likeword;
      } else if (this.tabsName == 'send') {
        user_desc = this.formData.sendword;
      }

      // 商品链接和词根都不能有异常
      if (user_desc != '' && user_link != '' && (user_link.indexOf('item.jd.com') > -1 || this.testNum(user_link) == true)) {
        this.isBtnOk = true
        let user_descs = user_desc.split('\n')
        // 搜索词字符串转为数组
        if (user_descs.length > 0) {
          let user_descs2 = new Array();
          for (var i = 0; i < user_descs.length; i++) {
            let ud = user_descs[i];
            if (ud != '' && ud != undefined) {
              let ud1 = ud.replace('(🥇最佳) ', '')
              ud1 = ud1.replace('(🥈次佳) ', '')
              ud1 = ud1.replace('(🥉次次佳) ', '')
              user_descs2.push(ud1);
            }
          }

          let move = await zsql.remove('searchdata')
          // 搜索值初始化存储浏览器
          let add = await zsql.add('searchdata', { "status": 0, "data": [] });
          // 将停止函数标记修改为false
          await this.startSearch()

          // 定时监听搜索值变化
          await this.watchSearchData()
          //console.log(user_descs2,this.formData.sortType, this.formData.appType,)
          this.searchType = '手动'
          let uid = this.getUUID();
          // 开始手动搜索
          this.searchResult = await checkSKULoc(this.formData.sortType, this.formData.appType, user_link, user_descs2, uid)

        }
      } else {
        this.isBtnOk = false
        Message.error({ message: `搜索词、商品链接、标题不能为空或不合法`, duration: 3000, showClose: true });
      }
    },

    // 自动搜索
    async autoSearch() {

      // 自动搜索
      /* let skuid = changeInputData(this.formData.appType, this.formData.link).id
      //console.log(skuid)
      let splitList = this.formData.splitword.split('\n')
      //this.autodata = await autoSearchTaobao2(this.formData.sortType, skuTitle, splitList, skuid)
      //await autoSearchTaobao2(this.formData.sortType, skuTitle, splitList, skuid)
      let st1 = setInterval(() => {
        this.autodata = JSON.parse(window.sessionStorage.getItem("autodata"))
        //console.log("autodata:  ", this.autodata)
        if (this.autodata.status == 100) {
          window.sessionStorage.removeItem('autodata')
          clearInterval(st1)
        }
      }, 2000);

      await autoSearchTaobao3(this.formData.sortType, skuTitle, splitList, skuid) */
      let fsp = this.formData.splitword.replace(/^\s*|\s*$/g, "");
      if ((this.formData.link.indexOf('id=') > -1 || this.testNum(this.formData.link) == true) && fsp != '' && (this.UrlData.title != undefined && this.UrlData.title != '')) {
        this.isautoBtnOk = true
        // 获取商品ID
        let skuid = changeInputData(this.formData.appType, this.formData.link).id
        // 获取分词结果
        let splitList = this.formData.splitword.split('\n')
        let strList = new Array()
        for (let i = 0; i < splitList.length; i++) {
          let strs = splitList[i];
          if (strs != '') {
            strList.push(strs)
          }
        }
        // 获取标题
        let skuTitle = this.UrlData.title;


        let move = await zsql.remove('searchdata')
        // 搜索值初始化存储浏览器
        let add = await zsql.add('searchdata', { "status": 0, "data": [] });
        // 将停止函数标记修改为false
        await this.startSearch()
        // 定时监听搜索值变化
        await this.watchSearchData()

        this.searchType = '自动'
        this.searchResult = await autoSearchTaobao(this.formData.sortType, skuTitle, strList, skuid)


      } else {
        this.isautoBtnOk = false
        Message.error({ message: `商品链接、拆分词或商品标题为空！`, offset: 120, duration: 3000, showClose: true });
      }


    },

    // czp 缓存数据5分钟
    async getStorageData() {
      //console.log('---------zhixing huoqu-------')
      let resStorage = await 浏览器_get_storage("tableDataStorage")
      resStorage = resStorage || []
      resStorage.map(item => this.tableDataStorage.push(item))
      // console.log('this.tableDataStorage: ', this.tableDataStorage);
      let res = this.tableDataStorage.filter(item => item.link = this.formData.link)
      // console.log('this.formData.link: ', this.formData.link);
      if (res.length == 0) return
      //console.log('res: 取到的缓存数据', res);
      let now = Date.parse(new Date())
      let before = res[0].timeStamp
      if (now - before > 50 * 60 * 1000) {
        let res2 = res.filter(item => item.link != this.formData.link)
        await 浏览器_set_storage("tableDataStorage", res2)
      } else {
        res[0].tableData.map(item => this.tableData.push(item))
        this.UrlData = res[0].UrlData
        this.formData = res[0].formData
      }
    }
  },

  watch: {

    //监听组件显示变量的变化，然后进行检查登录
    async dialogVisible(newValue, oldValue) {
      //监听组件显示变量的变化，然后进行检查登录
      //let r = await this.checkLogin();
    },

    // 当手动搜索的结果有变化时候（每次都是给完成的），把当前在查询的值放到第一个
    searchResult: {
      async handler(newVal, oldVal) {
        if (newVal != undefined && newVal.status > 0) {
          let newV = newVal.data
          let newType = newVal.type;
          //this.tableData = newV
          //zlog.log('newV', newV)
          // 遍历每次获取的新值
          for (let i = 0; i < newV.length; i++) {
            // 获取关键词和完成状态
            let newKey = newV[i].keyword;
            let newStatus = newV[i].status;
            let newLoc = newV[i].location;
            let newTime = newV[i].oktime;
            let newgds = newV[i].goods;
            // 默认是放进列表的
            let newInFlag = true
            // 遍历列表数据, 寻找不放进去的条件
            for (let j = 0; j < this.tableData.length; j++) {
              // 获取列表的关键词和状态
              let tableKey = this.tableData[j].keyword;
              let tableStatus = this.tableData[j].status;
              let tabletime = this.tableData[j].oktime;
              let tablegds = this.tableData[j].goods;
              //1.两个关键词要相同的话
              //2.(1)状态相同的话不放进去,(2)如果新值状态是true,列表是false,要把列表的值去掉然后放进去
              //3.再次查询的值,时间不同就放进去
              //4.没有查询到的值，从列表中删除
              if (newKey == tableKey) {
                if (newStatus == tableStatus) {
                  if (newTime == tabletime) {
                    newInFlag = false
                  }
                } else if (newStatus == true && tableStatus == false) {
                  this.tableData.shift()
                  if (newType == 'auto') {
                    if (newLoc.indexOf('位') == -1 && newLoc.indexOf('查询') == -1) {
                      newInFlag = false
                    }
                  }
                }

                if (newgds != tablegds && newStatus == tableStatus && newTime == tabletime) {
                  this.tableData[j].goods = newgds;

                }
              }
            }
            if (newInFlag == true) {
              if (newType == 'auto') {
                if (newLoc.indexOf('位') > -1 || newLoc.indexOf('查询') > -1) {
                  this.tableData.unshift(newV[i])
                }
              } else {
                this.tableData.unshift(newV[i])
              }
            }
          }

        }
      },
      deep: true
    },


    // czp 缓存数据5分钟
    /* percentage: {
     handler(newV, oldV) {
       console.log('newV: ', newV);
       if (newV == 100) {
         let tableDataWithTime = { UrlData: this.UrlData, formData: this.formData, tableData: this.tableData, timeStamp: Date.parse(new Date()), link: this.formData.link }
         this.tableDataStorage.push(tableDataWithTime)

         console.log('this.tableDataStorageh', this.tableDataStorage)
         浏览器_set_storage("tableDataStorage", this.tableDataStorage)
       } 
     },
     deep: true
   }  */

  },

  async mounted() {
    //chrome.storage.local.remove("tableDataStorage") //不要打开



  }


}
</script>

<style lang='scss' scoped>
@import '../../css/sass/JDrankingpanel.scss';

.noclick {
  pointer-events: none;
  background: rgba(172 172 172 / 83%) !important;
}


// .dtttt {
//   position: relative;
// }

// .tetetete {
//   position: absolute;
//   left: 35%;
//   top: 25%;
//   z-index: 9999 !important;
//   width: 360px;
//   height: 360px;
// }

// .ssss {
//   position: absolute;
//   left: 36%;
//   top: 26%;
//   z-index: 9999+1 !important;
//   cursor: pointer;
// }

// .detailczp {
//   .title {
//     width: 600px;
//     height: 21px;
//     font-size: 16px;
//     font-family: Microsoft YaHei;
//     font-weight: 400;
//     line-height: 21px;
//     color: #FF9712;
//     overflow: hidden;
//   }

//   .box {
//     margin-top: 10px;
//     display: flex;
//     justify-content: space-between;

//     .category {
//       width: 261px;
//       height: 19px;
//       font-size: 14px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       line-height: 19px;
//       color: #999999;
//     }

//     .timestamp {
//       font-size: 14px;
//       font-family: Microsoft YaHei;
//       font-weight: 400;
//       line-height: 19px;
//       color: #000000;
//     }

//   }
// }
</style>