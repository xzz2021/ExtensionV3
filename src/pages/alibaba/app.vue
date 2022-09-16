<template>
    <div class="导航栏 jclpanel">
      <header>
        <div class="section">
          <img style="width: 107px; height: 40px"
            src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/logobg.png" alt="" />
        </div>
      </header>
      <main>
        <div>
          <el-dropdown placement="right-start">
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-dianpu"></i></div>
              <div class="title">店铺诊断</div>
              <div class="arrow-right-czp"><i class="meIconfont meicon-youjt"></i></div>
            </span>
            <el-dropdown-menu  >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown placement="right-start">
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-tupian "></i></div>
              <div class="title">图片下载</div>
              <div class="arrow-right-czp"><i class="meIconfont meicon-youjt"></i></div>
            </span>
            <el-dropdown-menu  >
              <el-dropdown-item command="a">
                <div class="drop-menu">全部下载</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown placement="right-start">
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-pinglun"></i></div>
              <div class="title">无图评论下载</div>
              <div class="arrow-right-czp"><i class="meIconfont meicon-youjt"></i></div>
            </span>
            <el-dropdown-menu  >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown placement="right-start">
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-pingjia"></i></div>
              <div class="title">有图评论下载</div>
              <div class="arrow-right-czp"><i class="meIconfont meicon-youjt"></i></div>
            </span>
            <el-dropdown-menu  >
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div>
          <el-dropdown disabled>
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-liulan"></i></div>
              <div class="title" >浏览记录</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
            <el-dropdown-menu  ></el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown disabled>
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-biaoti"></i></div>
              <div class="title" >标题工具</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
            <el-dropdown-menu  ></el-dropdown-menu>
          </el-dropdown>
        </div>
        <div>
          <el-dropdown disabled>
            <span class="el-dropdown-link">
              <div class="meicon-logo"><i class="meIconfont meicon-shouye"></i></div>
              <div class="title" >回到首页</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
            <el-dropdown-menu  ></el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <div>
          <el-dropdown disabled>
            <span class="el-dropdown-link">
              <div class="meicon-logo" style="margin: 0 4px 2px 10px;"><i class="el-icon-user-solid"></i></div>
              <div v-if="userid" class="title" @click="changeAccount()">切换账号</div>
              <div v-else class="title" @click="goTOLogin()">账号登录</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
            <el-dropdown-menu  ></el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-if="userid">
          <el-dropdown disabled>
            <span class="el-dropdown-link">
              <div class="meicon-logo" style="margin: 0 4px 2px 10px;"><i class="el-icon-s-promotion"></i></div>
              <div class="title" @click="logout()">退出登录</div>
              <div class="arrow-right-czp"><i class="meIconfont"></i></div>
            </span>
            <el-dropdown-menu  ></el-dropdown-menu>
          </el-dropdown>
        </div> -->
      </main>
      <footer>
        <!-- <div class="version">{{ BUS.SHOW.version }}</div> -->
        <div class="version">0817</div>
      </footer>

    </div>
</template>

<script>

export default {
  
  mounted() {},
}
</script>

<style lang="scss" scoped>
@import '../../css/sass/jclpanel.scss';
</style>
