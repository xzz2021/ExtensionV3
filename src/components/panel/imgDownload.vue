<!--
 * @Date: 2022-10-29 11:14:32
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-10-29 11:23:01
-->
<template>
<div   class="imgDownBox">
        <el-dropdown placement="right-start" >
          <span class="el-dropdown-link">
            <div class="jclicon"><i class="xzzicon-tupian"></i></div>
            <div class="title" >图片下载</div>
            <div class="arrow-right-czp"><i class="xzzicon-youjt"></i></div>
          </span>
          <template #dropdown>
             <el-dropdown-menu >
              <!-- <el-dropdown-item :command="item.arg" v-for="item in pictureOption" :key="item.value">
                <div class="drop-menu">
                  {{ item.value }}
                </div>
              </el-dropdown-item> -->
              <slot name= "imgNum"></slot>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

</template>
<script setup>


</script>
<style  lang='scss' scoped>
.imgDownBox{
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