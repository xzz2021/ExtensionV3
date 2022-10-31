<!--
 * @Date: 2022-10-29 10:49:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-29 10:55:53
-->
<template>
<div class="diagnosisBox">
        <el-dropdown placement="right-start">
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-dianpu"></i></div>
            <div class="title">店铺诊断</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <el-dropdown-item v-for="item in diagnosisOption" :key="item.value" :command="item.value">
                <div class="drop-menu">销售前{{ item.value }}商品</div>
              </el-dropdown-item> -->
              <slot name= "diagnosisNum"></slot>
              <el-dropdown-item>
              <div class="drop-menu" style="text-align: center;" @click="scanRecord">浏览记录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

</template>
<script setup>


</script>
<style  lang='scss' scoped>
.diagnosisBox{
         margin: 5px 0;
        border-radius: 4px;
        background: rgba(255, 252, 246, 0.712);
  
        .el-dropdown {
          .el-dropdown-link {
            // background-color: rgb(101, 243, 124);
            display: flex;
            align-items: center;
            cursor: pointer;
            
            // margin-right: 20px;
            .jclicon {
              margin: 0 4px 0 10px;
              width: 16px;
  
            }
            .title {
              text-align: left;
              // background-color: rgb(238, 248, 98);
              // margin-right: 14px;
              width: 94px;
              padding: 9px 10px 9px 0;
              // height: 20px;
              font-size: 14px;
              font-family: MicrosoftYaHei;
              font-weight: 400;
              line-height: 20px;
            }
            .arrow-right-czp {
              font-size: 10px;
              width: 16px;
              margin-right: 10px;
              // padding-right: 20px;
            }
            &:hover {
              color: #ff9712 !important;
              background-color: #ffa9391f;
            }
          }
        }





}

</style>