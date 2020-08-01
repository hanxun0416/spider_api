<template>
  <div class="app-container">

<el-form  class="demo-form-inline" :model="form" :inline="true"    label-position="left" label-width="80px" ref="dynamicValidateForm"  >
  <el-row :gutter="20">
    <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
      <el-form-item label="关键词" prop="keyword">
      <el-input  placeholder="关键词" v-model="form.keyword"></el-input>
    </el-form-item>
    </el-col>
    <el-col :span="6"  :xs="24"  :sm="12" :md="6" :lg="6" :xl="6">
      <el-form-item label="文章状态" >
        <el-select v-model="form.state" placeholder="请选择">
            <el-option label="区域一" value="区域一"></el-option>
            <el-option label="区域二" value="区域二"></el-option>
        </el-select>
    </el-form-item>
    </el-col>
    <el-col :span="6"  :xs="24"  :sm="12" :md="6" :lg="6" :xl="6">
     <!-- <el-form-item label="分类目录">
   <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :size="medium"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </el-form-item> -->
   <el-form-item label="分类目录" prop="catalogue">
    <el-select  v-model="form.catalogue" placeholder="请选择分类目录">
      <el-option label="区域一" value="区域一"></el-option>
      <el-option label="区域二" value="区域二"></el-option>
    </el-select>
  </el-form-item>
  </el-col>
  <el-col :span="6" :xs="24"  :sm="12" :md="6" :lg="6" :xl="6">
     <el-form-item label="专题" prop="special">
  <el-select v-model="form.special" placeholder="请选择">
      <el-option label="区域一" value="区域一"></el-option>
      <el-option label="区域二" value="区域二"></el-option>
  </el-select>
  </el-form-item>
  </el-col>
</el-row>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')" size="mini">查询</el-button>
     <el-button @click="resetForm('dynamicValidateForm')" size="mini">重置</el-button>
  </el-form-item>
</el-form>
 <el-button type="primary" icon="el-icon-plus" size="mini">写文章</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
    <el-table-column
      type="index"
      width="60"
      align="center">
    </el-table-column>
      <el-table-column align="left" label="标题" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
         <!-- <el-link type="primary" :href="scope.row.url">{{ scope.row.title }}</el-link> -->
         <a :href="scope.row.url" style="color:#1890ff">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <!-- <el-badge is-dot class="item">数据查询</el-badge> -->



          <i  v-if="scope.row.manual=='1'" class="badge">正常</i>
          <i  v-else class="badge">异常</i>
          <!-- <el-badge is-dot v-else-if="scope.row.status=='1'">编辑完毕</el-badge>
          <el-badge is-dot v-else-if="scope.row.status=='2'">发送完毕</el-badge>
          <el-badge is-dot v-else-if="scope.row.status=='-1'">作废</el-badge> -->

        </template>
      </el-table-column>
      <el-table-column label="简称"  align="left" width="100">
        <template slot-scope="scope">
          {{scope.row.sitename}}
        </template>
      </el-table-column>
      <el-table-column label="分类"  align="left" width="150">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.category" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="left">
        <template slot-scope="scope">
         <!-- <el-link href="{{scope.row.siteurl}}" > </el-link> -->
           <el-link type="primary" :underline="false" :href="scope.row.siteurl">{{ scope.row.siteurl }}</el-link>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="标签" align="left" width="80">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.tag" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
         <!-- <el-table-column label="评论"  align="left" width="80">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column> -->
         <el-table-column label="官网"  align="left">
        <template slot-scope="scope">
            <el-link type="primary" :underline="false" :href="scope.row.appwebsite">{{ scope.row.appwebsite }}</el-link>
          <!-- {{ scope.row.appwebsite }} -->
        </template>
      </el-table-column>


      <!-- <el-table-column align="left" prop="created_at" label="发布时间">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
           <el-table-column label="操作" align="left">
        <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <el-button type="primary" size="small" icon="el-icon-edit" circle  @click="getArticle(scope.row._id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="回收站" placement="top">
                <el-button type="danger" size="small" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="设置" placement="top">
                <el-button type="info" size="small" icon="el-icon-setting" circle></el-button>
            </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList,getApp } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      form: {
        keyword: '',
        state: '',
        catalogue: '',
        special:'',
      },
      listPage:{
        page:1,
        size:10,
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      let obj = {status:0}
      getList(obj,this.listPage).then(response => {
        console.log(response)

        this.list = response.data.content
        this.listLoading = false
      })
    },
    //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //查询
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     alert('submit!');
        //   } else {
        //     console.log('error submit!!');
        //     return false;
        //   }
        // });

        console.log(this.form)
      },
      // 获取文章详情
      getArticle(id){
        console.log(id)
          getApp(id).then(res=>{
            console.log(res)
          })
      }
  }
}


</script>
<style scoped>
  .item{margin-top: 5px}
</style>
