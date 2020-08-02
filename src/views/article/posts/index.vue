<template>
  <div class="app-container">
    <el-form
      class="demo-form-inline"
      :model="listData"
      :inline="true"
      label-position="left"
      label-width="80px"
      ref="dynamicValidateForm"
    >
      <el-row :gutter="20">
        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="标题" v-model="listData.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="文章状态" prop="status">
            <el-select v-model="listData.status" placeholder="请选择">
              <el-option
                v-for="item in pageStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="文章来源" prop="status">
            <el-select v-model="listData.siteurl" placeholder="请选择">
              <el-option
                v-for="item in pageSite"
                :key="item.value"
                :label="item.sitename"
                :value="item.siteurl"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="submitForm()" size="mini">查询</el-button>
            <el-button @click="resetForm('dynamicValidateForm')" size="mini">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-button type="primary" icon="el-icon-plus" size="mini">写文章</el-button> -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
      @select="thisSelect"
      @select-all="thisSelect"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column align="left" label="标题" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a :href="scope.row.url" style="color:#1890ff" target="_blank">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="200">
        <template slot-scope="scope">
          <i v-if="scope.row.status=='0'" class="badge">采集中</i>
          <i v-if="scope.row.status=='1'" class="badge">采集完成</i>
          <i v-if="scope.row.status=='2'" class="badge">发布中</i>
          <i v-if="scope.row.status=='3'" class="badge">发布完成</i>
        </template>
      </el-table-column>

      <el-table-column label="分类" align="left" width="150">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.category" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="left" width="150">
        <template slot-scope="scope">
          <el-tag type="info">{{ scope.row.sitename }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="标签" align="left">
        <template slot-scope="scope">
          <el-tag
            v-for="(item,index) in scope.row.tag"
            :key="index"
            style="margin-right:10px;margin-bottom:10px"
          >{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="官网" align="left">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            :href="scope.row.siteurl"
            target="_blank"
          >{{ scope.row.siteurl }}</el-link>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="left">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              circle
              @click="getArticle(scope.row._id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="回收站" placement="top">
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              circle
              @click="delArticle(scope.row._id)"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="设置" placement="top">
            <el-button type="info" size="small" icon="el-icon-setting" circle></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-form
      class="demo-form-inline"
      :model="listData"
      :inline="true"
      label-position="left"
      label-width="80px"
      style="margin-top:20px"
    >
      <el-row>
        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item label="批量修改">
            <el-select v-model="batchEdit.status" placeholder="请选择">
              <el-option
                v-for="item in pageStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <el-form-item>
            <el-button type="primary" @click="batchStatus" size="mini">确定修改</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align: center;">
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        hide-on-single-page
        @prev-click="prevClick"
        @next-click="nextClick"
        @current-change="currentChange"
        @size-change="sizeChange"
        :page-size="listPage.size"
        :page-sizes="[1,2,5,10,20,50,100]"
        v-if="pageshow"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { getSite } from "@/api/article";

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    },
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listData: {
        status: 1,
      },
      listPage: {
        page: 1,
        size: 10,
      },
      totalPage: 1,
      pageStatus: [
        {
          value: 0,
          label: "采集中",
        },
        {
          value: 1,
          label: "采集完成",
        },
        {
          value: 2,
          label: "发布中",
        },
        {
          value: 3,
          label: "发布完成",
        },
      ],
      pageshow: true,
      pageSite: [],
      idSelect: [], //选中的id
      batchEdit: {
        status: 1,
        id: [],
      },
    };
  },
  created() {
    this.fetchData();
    this.getsite();
  },
  methods: {
    getsite() {
      let obj = {};
      getSite(obj, this.listPage).then((res) => {
        this.pageSite = res.data;
      });
    },
    fetchData() {
      this.listLoading = true;
      getList(this.listData, this.listPage).then((response) => {
        this.list = response.data.content;
        this.listLoading = false;
        this.totalPage = response.data.pages;
      });
    },
    // 获取文章详情
    getArticle(id) {
      let routeData = this.$router.resolve({ name: "Write", query: { id } });
      window.open(routeData.href, "_blank");
    },
    //prev-click
    prevClick(num) {
      this.listPage.page--;
      this.fetchData();
    },
    //next-click
    nextClick(num) {
      this.listPage.page++;
      this.fetchData();
    },
    //currentChange
    currentChange(num) {
      this.listPage.page = num;
      this.fetchData();
    },
    // size-change
    sizeChange(num) {
      this.listPage.size = num;
      this.fetchData();
    },
    // 查询
    submitForm() {
      this.listPage.page = 1;
      this.pageshow = false;

      this.fetchData();
      this.$nextTick(() => {
        this.pageshow = true;
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //单选
    thisSelect(item) {
      this.idSelect = item;
    },
    //批量修改
    batchStatus() {
      if (this.idSelect.length) {
        this.idSelect.forEach((item) => {
          this.batchEdit.id.push(item._id);
        });
        console.log(this.batchEdit);
      }else{
          this.$message({
          message: '请选择你要操作的数据',
          type: 'warning'
        });
      }
    },
  },
};
</script>
<style scoped>
.item {
  margin-top: 5px;
}
</style>
