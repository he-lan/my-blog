<template>
  <div class="main">
    <div class="condition">
      <label class="titlelabel">呼叫区域设置</label>
    </div>
    <div class="condition">
      <div class="divbtn" style="width:100px" @click="addareaclick">
        <i style="font-weight:900" class="el-icon-plus"></i>添加区域</div>
    </div>
    <div class="divtable">
      <el-table :data="tableData" style="width: 100%" @row-click="updatearea">
        <el-table-column prop="name" label="区域名称">
        </el-table-column>
        <el-table-column prop="personname" label="负责人">
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.state=='1'" style="color:#5CB082">启用</span>
            <span v-else>未启用</span>
          </template>
        </el-table-column>
        <el-table-column prop="deptname" label="所属部门">
        </el-table-column>
        <el-table-column prop="location" label="区域地点" width="300">
        </el-table-column>
        <el-table-column prop="type" label="区域分类">
          <template slot-scope="scope">
            <span v-if="scope.row.type=='1'">医疗</span>
            <span v-if="scope.row.type=='0'">护理</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popover placement="top" v-model="scope.row.isdelete">
              <p>确定删除该条区域信息吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="default" @click="scope.row.isdelete = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deletearea(scope.row)">确定</el-button>
              </div>
              <el-button slot="reference" size="mini">删除</el-button>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--添加区域 -->
    <el-dialog title="添加区域" :visible.sync="isaddarea" width="40%">
      <div class="add-dialog-area">
        <div class="add-area-param">
          <label class="add-area-label">区域名称：</label>
          <el-input size="mini" v-model="addform.areaname" style="width:200px"></el-input>
        </div>
        <div class="add-area-param">
          <label class="add-area-label">负责人：</label>
          <el-input size="mini" v-model="addform.personname" readonly @click.native="openperoson" style="width:200px"></el-input>
        </div>
        <div class="add-area-param">
          <label class="add-area-label">所属部门：</label>
          <el-input size="mini" v-model="addform.deptname" readonly @click.native="opendept" style="width:200px"></el-input>
        </div>
        <div class="add-area-param">
          <label class="add-area-label">区域位置：</label>
          <el-input size="mini" v-model="addform.location" style="width:200px"></el-input>
        </div>
        <div class="add-area-param">
          <label class="add-area-label">区域分类：</label>
          <el-select size="mini" v-model="addform.type" style="width:200px">
            <el-option value="1" label="医疗"></el-option>
            <el-option value="0" label="护理"></el-option>
          </el-select>
        </div>
        <div class="add-area-param">
          <label class="add-area-label">状态：</label>
          <el-checkbox-group v-model="statelist" :max="1">
            <el-checkbox label="启用"></el-checkbox>
            <el-checkbox label="未启用"></el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="add-dialog-footer">
          <div class="divbtn" style="width:150px;height:30px;line-height:30px;" @click="addarea">确认添加</div>
          <el-button type="default" style="width:150px;height:30px;line-height:5px;" @click="addareacancel">取消</el-button>
        </div>
      </span>
    </el-dialog>

    <!--选择负责人 -->
    <el-dialog title="请选择负责人" :visible.sync="ischooseperson" width="50%">
      <div class="choose-dialog-main" style="height:300px">
        <el-input placeholder="输入关键字进行过滤" style="width:90%;" size="small" v-model="filterText"></el-input>
        <el-tree class="filter-tree" node-key="id" ref="personref" :default-checked-keys="personchooselist" :data="personlist" check-stricty :filter-node-method="filterNode" show-checkbox default-expand-all @check="personcheck"></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="add-dialog-footer">
          <div class="divbtn" style="width:150px;height:30px;line-height:30px;" @click="chooseperson">确认</div>
          <el-button type="default" style="width:150px;height:30px;line-height:5px;" @click="ischooseperson=false">取消</el-button>
        </div>
      </span>
    </el-dialog>

    <!--选择所属部门 -->
    <el-dialog title="请选择所属部门" :visible.sync="ischoosedept" width="50%">
      <div class="choose-dialog-main" style="height:300px">
        <el-input placeholder="输入关键字进行过滤" size="small" style="width:90%;" v-model="filterdept"></el-input>
        <el-tree class="filter-tree" node-key="id" ref="deptref" :default-checked-keys="deptchooselist" :data="deptlist" check-stricty :filter-node-method="deptfilter" show-checkbox default-expand-all @check="deptchoose"></el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <div class="add-dialog-footer">
          <div class="divbtn" style="width:150px;height:30px;line-height:30px;" @click="choosedept">确认</div>
          <el-button type="default" style="width:150px;height:30px;line-height:5px;" @click="ischoosedept=false">取消</el-button>
        </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apicom from '../../api'
export default {
  data() {
    return {
      tableData: [],
      deptid: 1,//部门id
      checkitem: {},
      isaddarea: false,//添加区域模态框状态
      addform: {
        url: "submitAreaInfo.do",
        areaid: "",
        areaname: "",
        manager: "",
        state: "",
        deptid: "",
        deptname: "",
        location: "",
        personname: ""
      },
      statelist: [],
      ischooseperson: false, //负责人模态框状态
      filterText: "",//负责人筛选
      personchooselist: [],//默认选择负责人
      personlist: [],//所有负责人

      ischoosedept: false,//所属部门模态框状态
      filterdept: "",//所属部门筛选
      deptchooselist: [],//默认选中所属部门
      deptlist: [],//所有部门数据
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.load();
      this.loadperson();
      this.loaddepart();
    })
  },
  watch: {
    filterText(val) {
      this.$refs.personref.filter(val);
    },
    filterdept(val) {
      this.$refs.deptref.filter(val);
    },
  },
  methods: {
    load() {
      let _this = this;
      let comapi = new apicom();
      let form = {
        dept: _this.deptid,
        person: 1
      }
      comapi.getDataByGet("arealist.do", form, res => {
        res.data.data.forEach(function (item) {
          item.isdelete = false;
        })
        _this.tableData = res.data.data;
      })
    },
    //加载负责人
    loadperson() {
      let _this = this;
      let comapi = new apicom();
      comapi.getDataByGet("organperson.do", {}, res => {
        _this.personlist = res.data.data;
      })
    },
    //加载部门数据
    loaddepart() {
      let _this = this;
      let comapi = new apicom();
      comapi.getDataByGet("organdept.do", {}, res => {
        _this.deptlist = res.data.data;
      })
    },
    //删除区域
    deletearea(row) {
      let _this = this;
      let comapi = new apicom();
      let form = {
        areaid: row.id
      }
      comapi.getDataByGet("delareainfo.do", form, res => {
        console.log(res.data);
        if (res.data.result == "success") {
          _this.$message({
            message: res.data.msg,
            type: "success"
          })
          _this.$nextTick(() => {
            _this.load();
          })
        }
      })

    },

    //修改区域
    updatearea(row, column) {

      if (column.label != "操作") {
        let _this = this;
        _this.statelist = [];
        _this.addform = {
          ...row,
          areaname: row.name,
          deptid: row.dept,
          areaid: row.id,
          url: "submitAreaInfo.do"
        };
        _this.personchooselist.push(row.manager);
        _this.deptchooselist.push(row.dept);
        let states = row.state == "1" ? "启用" : "未启用"
        _this.statelist.push(states);
        _this.isaddarea = true;
      }
    },
    //添加区域按钮点击
    addareaclick() {
      this.isaddarea = true;
      this.addform = {
        url: "submitAreaInfo.do",
        areaid: "",
        areaname: "",
        manager: "",
        state: "",
        deptid: "",
        deptname: "",
        location: "",
        personname: "",
        type: ""
      }
    },
    //确认添加
    addarea() {
      let _this = this;
      let comapi = new apicom();
      _this.addform.state = _this.statelist[0] == "未启用" ? 0 : 1
      comapi.getDataByPost(_this.addform, res => {
        if (res.data.result == "success") {
          _this.$message({
            message: res.data.msg,
            type: "success"
          })
          _this.$nextTick(() => {
            _this.isaddarea = false;
            _this.load();
          })
        }
      })
    },
    //取消
    addareacancel() {
      if (this.addform.areaid != undefined && this.addform.areaid != "") {

      }
      this.isaddarea = false;
    },
    //打开负责人模态框
    openperoson() {
      this.ischooseperson = true;
    },
    //确认选择负责人
    chooseperson() {
      this.ischooseperson = false
    },
    //筛选人员
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //当前选中的人员
    personcheck(item, checkdata) {
      let _this = this;
      _this.addform.manager = item.id;
      _this.addform.personname = item.label;
      if (checkdata.checkedKeys.length > 0) {
        _this.$refs.personref.setCheckedKeys([item.id]);
      }
      console.log(_this.addform.personname);

    },

    //筛选所属部门
    deptfilter(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //所属部门选择
    deptchoose(item, checkdata) {
      let _this = this;
      _this.addform.deptid = item.id;
      _this.addform.deptname = item.label;
      if (checkdata.checkedKeys.length > 0) {
        _this.$refs.deptref.setCheckedKeys([item.id]);
      }
    },
    //打开部门模态框
    opendept() {
      this.ischoosedept = true;
    },
    //确认选择部门
    choosedept() {
      this.ischoosedept = false;
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: white;
}
.condition {
  width: 100%;
  height: 40px;
  line-height: 40px;
  float: left;
  margin: 0px 10px 10px 10px;
}
.titlelabel {
  font-size: 20px;
  font-weight: 800;
}

.divbtn {
  height: 30px;
  line-height: 30px;
  color: #ffffff;
  font-weight: 600;
  background-color: #5cb082;
  text-align: center;
  border-radius: 4px;
  letter-spacing: 1px;
}
.divbtn:hover {
  background-color: #6bbf8b;
}
.divtable {
  width: 100%;
  height: calc(100% - 100px);
}

.add-dialog-footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.add-dialog-footer div {
  margin-right: 50px;
}
.add-dialog-area {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.add-area-param {
  display: flex;
  align-items: center;
  width: 80%;
  height: 40px;
  line-height: 40px;
}
.add-area-label {
  width: 25%;
  text-align: end;
}
.filter-tree {
  height: 250px;
  overflow: auto;
}
</style>