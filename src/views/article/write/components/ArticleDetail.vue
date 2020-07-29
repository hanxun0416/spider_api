<template>
  <div class="createPost-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container">
      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="postForm.title" :maxlength="100" name="name" required>
                标题
              </MDinput>
            </el-form-item>

            <div class="postInfo-container">
              <el-row>
                <el-col :span="8">
                  <el-form-item label-width="60px" label="作者:" class="postInfo-container-item">
                    <!-- <el-select v-model="postForm.author" :remote-method="getRemoteUserList" filterable default-first-option remote placeholder="Search user">
                      <el-option v-for="(item,index) in userListOptions" :key="item+index" :label="item" :value="item" />
                    </el-select> -->
                     <el-input v-model="postForm.author"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <!-- <el-form-item style="margin-bottom: 40px;" label-width="70px" label="摘要:">
          <el-input v-model="postForm.content_short" :rows="1" type="textarea" class="article-textarea" autosize placeholder="Please enter the content" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}words</span>
        </el-form-item> -->

        <el-form-item prop="content" style="margin-bottom: 30px;">
          <Tinymce ref="editor" v-model="postForm.content" :height="400" />
        </el-form-item>
        <el-row type="flex">
           <el-col :span="24" style="text-align:center">
               <el-button type="primary" size="medium" @click="submitForm()" :loading="loading">发布</el-button>
            </el-col>
        </el-row>
      <Set-article  v-bind:drawer="drawerFlag"></Set-article>
        </div>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
import MDinput from '@/components/MDinput'
import SetArticle from '@/components/SetArticle'
import { validURL } from '@/utils/validate'
import { fetchArticle } from '@/api/article'
import { searchUser } from '@/api/remote-search'


const defaultForm = {
  status: 'draft',
  title: '', // 文章题目
  content: '', // 文章内容
  content_short: '', // 文章摘要
  source_uri: '', // 文章外链
  _id: undefined,
}

export default {
  name: 'ArticleDetail',
  components: { Tinymce, MDinput,SetArticle },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    //校验规则 标题 内容不能为空
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }

    return {
      postForm: Object.assign({}, defaultForm),
      loading: false,
      rules: {
        title: [{ validator: validateRequire }],
        content: [{ validator: validateRequire }]
      },
      drawerFlag:false

    }
  },

  created() {
    if (this.isEdit) {
      const id = this.$route.query && this.$route.query.id
      this.fetchData(id)
    }

    // Why need to make a copy of this.$route here?
    // Because if you enter this page and quickly switch tag, may be in the execution of the setTagsViewTitle function, this.$route is no longer pointing to the current page
    // https://github.com/PanJiaChen/vue-element-admin/issues/1221
  },

  methods: {
    fetchData(id) {
      //获取文章信息
      fetchArticle(id).then(response => {
        this.postForm = response.data
        this.setPageTitle()
      }).catch(err => {
        console.log(err)
      })
    },
    //设置页面title
    setPageTitle() {
      const title = 'Edit Article'
      document.title = `${title}`
    },
      //发布
    submitForm() {
      console.log(this.postForm)
      this.$refs.postForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.loading = true
          // this.$notify({
          //   title: '成功',
          //   message: '发布文章成功',
          //   type: 'success',
          //   duration: 2000
          // })
          this.drawerFlag=true
          this.postForm.status = 'published'
          this.loading = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    //保存
      draftForm() {
      if (this.postForm.content.length === 0 || this.postForm.title.length === 0) {
        this.$message({
          message: '请填写必要的标题和内容',
          type: 'warning'
        })
        return
      }
      this.$message({
        message: '保存成功',
        type: 'success',
        showClose: true,
        duration: 1000
      })
      this.postForm.status = 'draft'
    },

  }
}
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
