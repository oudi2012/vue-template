<template>
  <div class="dashboard-container">
    <div class="dashboard-title">1. 文件管理系统svn代码地址</div>
    <div class="dashboard-text">地址：http://192.168.89.31/subversion/dingdang/o2o/branches/20160219/web/ddky-file-system-web</div>
    <div class="dashboard-title">2. 文件管理系统wiki对接介绍</div>
    <div class="dashboard-text">地址：http://192.168.89.30/pages/viewpage.action?pageId=3019443</div>
    <div class="dashboard-title">3. 系统-应用-接口说明</div>
    <div class="dashboard-text">
      <div class="desc_item">系统：当前我们使用的后台管理系统，如果 erp, area-erp, fms, area-fms, pop 等</div>
      <div class="desc_item">应用：每个系统中，对应的左侧菜单的二级菜单，为应用，如财务系统中，财务系统 fms 为系统，在线支付对账 菜单为 应用</div>
      <div class="desc_item">接口：一个应用对应一个接口，在线支付对账，对应的接口就是在线支付对账 数据导出接口，当前不支持在对应的应用中添加两个导出接口。</div>
    </div>
    <div class="dashboard-title">4. 定时任务说明</div>
    <div class="dashboard-text">
      <div class="desc_item">4.1、 按照系统类别获取每个系统下，存在的导出任务</div>
      <div class="desc_item" style="padding-left: 30px">
        说明：任务所在位置：
        package com.ddky.file.rest.job;<br>
        class ExportJob --> execLoadData --> @Scheduled(cron="*/10 * * * * ?") 执行频率：10 秒执行一次
      </div>
    </div>
    <div class="dashboard-text">
      <div class="desc_item">4.2、 根据获取到的数据，生成要导出的文件</div>
      <div class="desc_item" style="padding-left: 30px">
        说明：任务所在位置：
        package com.ddky.file.rest.job;<br>
        class ExportJob --> execCreateFile --> @Scheduled(cron="*/10 * * * * ?") 执行频率：10 秒执行一次
      </div>
    </div>
    <div class="dashboard-text">
      <div class="desc_item">4.3、 删除加载过的数据</div>
      <div class="desc_item" style="padding-left: 30px">
        说明：任务所在位置：
        package com.ddky.file.rest.job;<br>
        class ExportJob --> removeLoadData --> @Scheduled(cron="0 0/10 * * * ?") 执行频率：10 分钟执行一次
      </div>
    </div>
    <div class="dashboard-title">5. 导出系统保留数据的时间</div>
    <div class="dashboard-text" style="padding-left: 30px">
      <div class="desc_item">5.1、 加载的导出数据（加载完成的）保留1天</div>
      <div class="desc_item">5.2、 导出任务保留3天</div>
    </div>
    <div class="dashboard-title">6. 系统升级后，系统支持两种生成文件的方式</div>
    <div class="dashboard-text" style="padding-left: 30px">
      <div class="desc_item">6.1、 分别是：1、获取到数据后，不暂存数据，直接生成导出文件；2、保存数据，由定时任务生成导出文件</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-title {
    font-size: 14px;
    line-height: 40px;
    font-weight: bold;
  }
  &-text {
    font-size: 14px;
    line-height: 46px;
    padding-left: 30px;
    .desc_item {
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
