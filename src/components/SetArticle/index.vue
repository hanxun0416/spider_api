<template>
  <el-drawer
    title="文章设置"
    :visible.sync="drawer"
    direction="rtl"
    wrapperClosable
    show-close
    custom-class="drawerBox"
  >
    <div class="demo-drawer__content">
      <span>基本设置</span>
      <el-divider></el-divider>
      <el-form :model="setPageBasic" label-position="top">
        <el-form-item label="文章别名" :label-width="formLabelWidth">
          <el-input v-model="setPageBasic.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="发表时间" :label-width="formLabelWidth">
          <el-date-picker v-model="setPageBasic.region" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="开启评论">
          <el-radio v-model="setPageBasic.comment" label="1">开启</el-radio>
          <el-radio v-model="setPageBasic.comment" label="2">关闭</el-radio>
        </el-form-item>
        <el-form-item label="是否置顶">
          <el-radio v-model="setPageBasic.setTop" label="1">是</el-radio>
          <el-radio v-model="setPageBasic.setTop" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否首页轮播">
          <el-radio v-model="setPageBasic.setSlider" label="1">是</el-radio>
          <el-radio v-model="setPageBasic.setSlider" label="2">否</el-radio>
        </el-form-item>
        <el-divider></el-divider>
        <el-form-item label="活动性质">
          <el-checkbox-group v-model="setPageBasic.type">
            <el-checkbox label="美食/餐厅线上活动" name="type" style="display:block"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>1231
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
            <el-button
          type="primary"
          @click="select(2, $event)"
          :loading="loading"
        >{{ loading ? "提交中 ..." : "保存" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>


export default {
  name: "setArticleInfo",
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      direction: "rtl",
      setPageBasic: {
        type: [],
      },
      formLabelWidth: "80px",
      loading: false,
      selectType: 0,

    };
  },
  created() {
    //  this.getPageCont()
    console.log(this.$store.state)
  },
  watch: {
    draw(val) {
      this.drawFlag = draw;
    },
  },
  methods: {
    savePage() {
      console.log(this.setPageBasic);
    },
     select (type, event) {
            this.selectType = type
            this.$emit('select-type', type)
     },
     getPageCont(){
       this.setPageBasic = this.$store.state.setpageCont.postForm
      console.log('111')
      console.log(this.setPageBasic)
      console.log('111')
     }
  },
 
};
</script>

<style >

</style>>
