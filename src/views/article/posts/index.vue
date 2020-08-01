<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" size="mini">写文章</el-button>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      fit
      highlight-current-row
    >
      <el-table-column type="index" width="60" align="center"></el-table-column>
      <el-table-column align="left" label="标题" width="200" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <!-- <el-link type="primary" :href="scope.row.url">{{ scope.row.title }}</el-link> -->
          <a :href="scope.row.url" style="color:#1890ff">{{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <!-- <el-badge is-dot class="item">数据查询</el-badge> -->

          <i v-if="scope.row.status=='0'" class="badge">正常</i>
          <!-- <el-badge is-dot v-else-if="scope.row.status=='1'">编辑完毕</el-badge>
          <el-badge is-dot v-else-if="scope.row.status=='2'">发送完毕</el-badge>
          <el-badge is-dot v-else-if="scope.row.status=='-1'">作废</el-badge>-->
        </template>
      </el-table-column>
      <el-table-column label="简称" align="left" width="100">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.category" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分类" align="left" width="150">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.category" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="来源" align="left">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.tag" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="标签" align="left" width="80">
        <template slot-scope="scope">
          <el-tag v-for="(item,index) in scope.row.tag" :key="index">{{item}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="官网" align="left">
        <template slot-scope="scope">
          <el-link
            type="primary"
            :underline="false"
            :href="scope.row.appwebsite"
          >{{ scope.row.appwebsite }}</el-link>
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
    <div style="text-align: center;margin-top: 30px;">
    <el-pagination
  background
  layout="total, sizes, prev, pager, next, jumper"
  :total="totalPage"
  hide-on-single-page
  @prev-click = "prevClick"
  @next-click = "nextClick"
  @current-change="currentChange"
  @size-change="sizeChange"
  :page-size="listPage.size"
  :page-sizes="[1,2,5,10,20,50,100]"
  >
</el-pagination>
    </div>
  </div>
</template>

<script>
import { getList, test } from "@/api/table";

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
      form: {
        keyword: "",
        state: "",
        catalogue: "",
        special: "",
      },
      listPage: {
        page: 1,
        size: 10,
      },
      totalPage:1
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      let obj = { status:0 };
      getList(obj, this.listPage).then((response) => {
        this.list = response.data.content;
        this.listLoading = false;
        this.totalPage = response.data.pages
      });
    },
    // 获取文章详情
    getArticle(id) {
      this.$router.push({ name: "Write", query: { id } });
    },
    //prev-click	
      prevClick(num){
          this.listPage.page--
          this.fetchData();
      },
    //next-click	
    nextClick(num){
      this.listPage.page++
      this.fetchData();
    },
    //currentChange
    currentChange(num){
      this.listPage.page = num
      this.fetchData();
    },
   // size-change	
   sizeChange(num){
     console.log(num)
      this.listPage.size = num
      this.fetchData();
   }	
  },
};
</script>
<style scoped>
.item {
  margin-top: 5px;
}
</style>
