<template>
  <div class="dashboard-editor-container">
    <panel-group :count="dashboardLine.count" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart v-if="flag" :chart-data="dashboardLine.app_grow" />
    </el-row>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import LineChart from "./components/LineChart";
import { testJwt } from "@/api/article";
import { dashboard } from "@/api/dashboard";

export default {
  name: "adminDashboard",
  components: {
    PanelGroup,
    LineChart
  },

  data() {
    return {
      dashboardLine: {},
      flag:false
    };
  },
  methods: {},
  created() {
    // testJwt()
    dashboard().then(res => {
      console.log(res);
      this.flag = true
      this.dashboardLine = res.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
}
</style>
