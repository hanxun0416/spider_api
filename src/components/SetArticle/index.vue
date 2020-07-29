<template>
  <el-drawer
    title="文章设置"
    :visible.sync="drawer"
    direction="rtl"
    wrapperClosable
    show-close
  >
    <div class="demo-drawer__content">
      <el-form :model="setPageBasic">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="setPageBasic.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-input
            v-model="setPageBasic.region"
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input
            v-model="setPageBasic.type"
            :label-width="formLabelWidth"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button
          type="primary"
          @click="$refs.drawer.closeDrawer()"
          :loading="loading"
          >{{ loading ? "提交中 ..." : "确 定" }}</el-button
        >
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "setArticleInfo",
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      direction: "rtl",
      setPageBasic: {},
      formLabelWidth: "80px",
      loading: false,
    };
  },
  created() {},
  watch: {
    draw(val) {
      this.drawFlag = draw;
    }
  },
  methods: {
    cancelForm() {
      console.log("cancelForm");
    }
  }
};
</script>

<style scoped></style>>
