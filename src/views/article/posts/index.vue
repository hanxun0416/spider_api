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
      type="selection"
      width="55">
    </el-table-column>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

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
        size:10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        console.log(response)
        this.list = response.data.items
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
  }
}
</script>
