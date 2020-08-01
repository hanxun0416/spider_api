<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>标题</MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                    <!-- <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select>-->
                    <el-input v-model="postForm.author"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
        <el-row type="flex">
          <el-col :span="24" style="text-align:center">
            <el-button type="primary" size="medium" @click="submitForm()" :loading="loading">发布</el-button>
          </el-col>
        </el-row>
        <!-- <Set-article v-bind:drawer="drawerFlag"></Set-article> -->
      </div>
    </el-form>
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
        <el-form :model="postForm" label-position="top">
          <el-form-item label="文章别名">
            <el-input v-model="postForm.sitename" size="small"></el-input>
          </el-form-item>
          <!-- <el-form-item label="发表时间">
            <el-date-picker v-model="postForm.region" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="开启评论">
            <el-radio v-model="postForm.comment" label="1">开启</el-radio>
            <el-radio v-model="postForm.comment" label="2">关闭</el-radio>
          </el-form-item>
          <el-form-item label="是否置顶">
            <el-radio v-model="postForm.setTop" label="1">是</el-radio>
            <el-radio v-model="postForm.setTop" label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="是否首页轮播">
            <el-radio v-model="postForm.setSlider" label="1">是</el-radio>
            <el-radio v-model="postForm.setSlider" label="2">否</el-radio>
          </el-form-item>
          <el-divider></el-divider>
          <el-form-item label="活动性质">
            <el-checkbox-group v-model="postForm.type">
              <el-checkbox label="美食/餐厅线上活动" name="type" style="display:block"></el-checkbox>
              <el-checkbox label="地推活动" name="type"></el-checkbox>
              <el-checkbox label="线下主题活动" name="type"></el-checkbox>
              <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>1231
            </el-checkbox-group>
          </el-form-item>-->
          <el-form-item>
            <el-button
              type="primary"
              @click="updataAtrcle"
              :loading="loading"
            >{{ loading ? "提交中 ..." : "保存" }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import MDinput from "@/components/MDinput";
// import SetArticle from "@/components/SetArticle";
import { validURL } from "@/utils/validate";
import { fetchArticle, saveArticle } from "@/api/article";
import { searchUser } from "@/api/remote-search";

const defaultForm = {
  status: "draft",
  title: "", // 文章题目
  content: "", // 文章内容
  content_short: "", // 文章摘要
  source_uri: "", // 文章外链
  _id: undefined,
};

export default {
  name: "ArticleDetail",
  components: { Tinymce, MDinput },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    //校验规则 标题 内容不能为空
    const validateRequire = (rule, value, callback) => {
      if (value === "") {
        this.$message({
          message: rule.field + "为必传项",
          type: "error",
        });
        callback(new Error(rule.field + "为必传项"));
      } else {
        callback();
      }
    };

    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }],
      },
      drawer: false,
    };
  },

  created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id;
      this.fetchData(id);
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
  },

  methods: {
    fetchData(id) {
      //获取文章信息
      fetchArticle(id)
        .then((response) => {
          this.postForm = response.data;
          this.setPageTitle();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //设置页面title
    setPageTitle() {
      const title = "Edit Article";
      document.title = `${title}`;
    },
    //发布
    submitForm() {
      this.$refs.postForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          // this.$store.commit("setPageCont/updataPageCont", this.postForm)
          this.drawer = true;
          this.postForm.status = "published";
          this.loading = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //发布
    updataAtrcle() {
      console.log(this.postForm);
      let postForm = this.postForm;
      const id = postForm._id;
      delete postForm._id;
      postForm.status = 0;
      postForm.manual = 0;
      saveArticle(id, postForm)
        .then((response) => {
          this.$message({
            message: "保存成功",
            type: "success",
            showClose: true,
            duration: 1000,
          });
          this.drawer = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //保存
    draftForm() {
      if (
        this.postForm.content.length === 0 ||
        this.postForm.title.length === 0
      ) {
        this.$message({
          message: "请填写必要的标题和内容",
          type: "warning",
        });
        return;
      }

      this.postForm.status = "draft";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;

    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;

      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea ::v-deep {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>
<style>
.drawerBox {
  padding: 0 20px;
}
.el-drawer.rtl {
  overflow: scroll;
}
</style>