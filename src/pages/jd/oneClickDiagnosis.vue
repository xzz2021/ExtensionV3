<template>
  <vxe-modal
    class="诊断结果表格"
    className="mymodal tmmodal"
    v-model="diagnosisShow"
    width="auto"
    @hide="clearDiagnosisData"
    :position="{ top: 45 }"
    maskClosable
    marginSize="-600"
    resize
  >
    <template #title>
      <div class="headerSec">
        <el-button
          class="mybtn"
          type="warning"
          size="mini"
          icon="el-icon-download"
          @click="downloadExcel"
          >表格下载</el-button
        >
      </div>
      <div class="mytitle">
        <a
          icon="el-icon-goods"
          size="default"
          :href="diagnosisData.shopUrl"
          target="_blank"
          >{{ diagnosisData.shopName }}</a
        >
      </div>
    </template>
    <div class="container">
      <!-- 汇总表格 -->
      <vxe-table
        height="228"
        class="mySumTable"
        size="mini"
        :data="diagnosisData.sumData"
        stripe
        align="center"
        border
        round
      >
        <vxe-colgroup title="数据汇总">
          <vxe-column title="诊断数" width="130px">
            <template #default="{ row }">
              <div class="ml-4">{{ row.totalNum }}</div>
              <div class="ml-4">{{ row.salesRate }}</div>
            </template>
          </vxe-column>

          <vxe-column title="标题" width="350px">
            <template #default="{ row }">
              <div
                class="sumTitleBox"
                v-for="(item, index) in row.sumTitle"
                :key="index"
              >
                <div>{{ item.msg }}</div>
                <i v-tip="{ txt: item.okDesc }" class="xzzicon-isok"></i>
                <div style="width: 20px">{{ item.okNum }}</div>
                <i
                  style="width: 16px"
                  v-tip="{ txt: item.notDesc }"
                  :class="item.notNum == 0 ? '33' : 'xzzicon-notok'"
                ></i>
                <div style="width: 20px">
                  {{ item.notNum == 0 ? "" : item.notNum }}
                </div>
              </div>
            </template>
          </vxe-column>

          <vxe-column title="主图" width="350px">
            <template #default="{ row }">
              <div
                class="sumMainImgBox"
                v-for="(item, index) in row.sumMainImg"
                :key="index"
              >
                <div>{{ item.msg }}</div>
                <i v-tip="{ txt: item.okDesc }" class="xzzicon-isok"></i>
                <div style="width: 20px">{{ item.okNum }}</div>
                <i
                  style="width: 16px"
                  v-tip="{ txt: item.notDesc }"
                  :class="item.notNum == 0 ? '33' : 'xzzicon-notok'"
                ></i>
                <div style="width: 20px">
                  {{ item.notNum == 0 ? "" : item.notNum }}
                </div>
              </div>
            </template>
          </vxe-column>

          <vxe-column title="详情图片" width="200px">
            <template #default="{ row }">
              <div class="sumDetailImgBox">
                <div class="">{{ row.detailImg.msg }}</div>
                <i
                  v-tip="{ txt: row.detailImg.okDesc }"
                  class="xzzicon-isok"
                ></i>
                <div>{{ row.detailImg.okNum }}</div>
                <i
                  v-tip="{ txt: row.detailImg.notDesc }"
                  :class="row.detailImg.notNum == 0 ? '' : 'xzzicon-notok'"
                ></i>
                <div>
                  {{ row.detailImg.notNum == 0 ? "" : row.detailImg.notNum }}
                </div>
              </div>
            </template>
          </vxe-column>

          <vxe-column title="评价" width="220px">
            <template #default="{ row }">
              <div
                class="sumCommentBox"
                v-for="(item, index) in row.commentNum"
                :key="index"
              >
                <div>{{ item.msg }}</div>
                <i v-tip="{ txt: item.okDesc }" class="xzzicon-isok"></i>
                <div style="width: 20px">{{ item.okNum }}</div>
                <i
                  style="width: 16px"
                  v-tip="{ txt: item.notDesc }"
                  :class="item.notNum == 0 ? '' : 'xzzicon-notok'"
                ></i>
                <div style="width: 20px">
                  {{ item.notNum == 0 ? "" : item.notNum }}
                </div>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="店铺动态评分" width="300px">
            <template #default="{ row }">
              <div
                class="sumScoreBox"
                v-for="(item, index) in row.sumScore"
                :key="index"
              >
                <div>{{ item.msg }}</div>
                <div>{{ item.score }}</div>
                <i
                  v-tip="{ txt: item.desc }"
                  :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"
                ></i>
              </div>
            </template>
          </vxe-column>
          <vxe-column title="综合服务" width="260px">
            <template #default="{ row }">
              <div
                class="sumServiceBox"
                v-for="(item, index) in row.sumService"
                :key="index"
              >
                <div class="">{{ item.msg }}</div>
                <div class="">{{ item.score }}</div>
                <i class="xzzicon-isok"></i>
              </div>
            </template>
          </vxe-column>
        </vxe-colgroup>
      </vxe-table>

      <!-- 详情表格 -->
       <vxe-table height="540" class="myDetailTable" size="mini" :row-config="{ height: '170px' }" :data="diagnosisData.detailData" stripe
                   align="center" border round>
            <vxe-colgroup title="详情数据">
                <vxe-column type="seq" width="50"></vxe-column>

                <vxe-column title="商品图片" width="400px">
                    <template #default="{ row }">
                        <div class="shopBox">
                            <div><img :src="row.commodityInfo.mainImg" style="width: 80px" /></div>
                            <div class="right">
                                <div>
                                    <a :href="row.commodityInfo.url" target="_blank">{{row.commodityInfo.title}}</a>
                                </div>
                                <div class="">{{ row.commodityInfo.productId }}</div>
                                <div class="">{{ row.commodityInfo.price }}</div>
                                <div>{{ row.commodityInfo.discount }}</div>
                                <div>{{ row.commodityInfo.floorPrice }}</div>
                                <div>{{ row.commodityInfo.topPrice }}</div>
                            </div>
                        </div>
                    </template>
                </vxe-column>

                <vxe-column title="月销量" width="100px">
                    <template #default="{ row }">
                      <div >{{ row.monthSales }}</div>
                    </template>
                </vxe-column>

                <vxe-column title="标题诊断" width="200px">
                    <template #default="{ row }">
                            <div class="titleBox" v-for="(item, index) in row.titleDiagnosis" :key="index">
                                <div>{{ item.msg }}</div>
                                <i v-tip="{ txt: item.desc }" :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                            </div>
                    </template>
                </vxe-column>

                <vxe-column title="主图诊断" width="230px">
                    <template #default="{ row }">
                            <div class="mainImgBox" v-for="(item, index) in row.mainImgDiagnosis" :key="index">
                                <div>{{ item.msg }}</div>
                                <i v-tip="{ txt: item.desc }" :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                            </div>
                    </template>
                </vxe-column>

                <vxe-column title="详情图片诊断" width="180px">
                    <template #default="{ row }">
                        <div class="detailImgBox">
                                <div>{{ row.detailImg.msg }}</div>
                                <i v-tip="{ txt: row.detailImg.desc }" :class="row.detailImg.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                        </div>
                    </template>
                </vxe-column>

                <vxe-column title="评价诊断" width="200px">
                    <template #default="{ row }">
                            <div class="commentDiagnosisBox" v-for="(item, index) in row.commentDiagnosis" :key="index">
                                <div>{{ item.msg }}</div>
                                <i v-tip="{ txt: item.desc }" :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                            </div>
                    </template>
                </vxe-column>

                <vxe-column title="评价标签" width="291px">
                    <template #default="{ row }">
                                <div class="commentTagBox" v-for="(item, index) in row.commentTag" :key="index">
                                    <div>{{ item.tagType }}</div>
                                    <div class="tags" v-if="item.msg.length < 18">{{ item.msg }}</div>
                                    <el-tooltip v-else placement="top">
                                      <template #content > <div>{{ item.msg }}</div></template>
                                        <div class="tags">{{ item.msg }}</div>
                                    </el-tooltip>
                                    <i v-tip="{ txt: item.desc }" :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                                </div>
                    </template>
                </vxe-column>
                  <vxe-column title="活动诊断" width="180px">
                    <template #default="{ row }">
                            <div class="promotionsBox" v-for="(item, index) in row.promotionsDiagnosis" :key="index">
                                <div>{{ item.msg }}</div>
                                <i v-tip="{ txt: item.desc }" :class="item.isok ? 'xzzicon-isok' : 'xzzicon-notok'"></i>
                            </div>
                    </template>
                </vxe-column>
            </vxe-colgroup>
        </vxe-table>
    </div>
  </vxe-modal>
</template>
<script lang="setup">

const userstore = userStore()
const { diagnosisShow, diagnosisData  } = storeToRefs(userstore)



</script>


<style lang="scss" scoped>



</style>
