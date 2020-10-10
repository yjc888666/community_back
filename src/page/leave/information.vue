<template>
    <div style="margin-bottom:10px;" class="info">
        <div class="layui-form" v-show="menuShow">
            <div class="layui-field-box">
                <div class="layui-box-searchber">
                    <a href="javascript:;" class="layui-btn layui-btn-sm" id="add" @click="addEvent()" v-show="chang('/master/staffMessage/set')">
                        <i class="layui-icon"></i> 添加员工
                    </a>
                    <form class="layui-form layui-form-pane">
                        <div class="layui-inline" style="width: 110px;">

                            <!--<el-input v-model="username" placeholder="用户名查询" @change="getuser()"></el-input>-->
                            <el-select v-model="username"  placeholder="用户名"  @change="getuser()" clearable>
                                <el-option
                                    v-for="item in optionsUser"
                                    :key="item.id"
                                    :label="item.username"
                                    :value="item.username">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="layui-inline" style="width: 150px;">
                            <el-select v-model="position"  placeholder="职位" @change="getmobile()" clearable>
                                <el-option
                                    v-for="item in positionList"
                                    :key="item.id"
                                    :label="item.position"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="layui-inline" >
                            <div @click="daoEvent()" class="dao" v-if="chang('/master/staffMessage/staffMessageExcel')">导出</div>
                        </div>
                    </form>
                </div>
                <hr>
                <el-table
                    :data="signListFilter"
                    stripe
                    style="width:100%"
                    type="flex"
                    header-align="center"
                >
                    <el-table-column
                        type="index"
                        label="ID"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                    <el-table-column
                        prop="username"
                        label="姓名"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        <el-table-column
                        prop="gender"
                        label="性别"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        <el-table-column
                        prop="entrydate"
                        label="入职时间"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        <el-table-column
                        prop="tryoutdate"
                        label="试用期时间"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        <el-table-column
                        prop="justdate"
                        label="转正时间"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                     <el-table-column
                        prop="position_id"
                        label="职称"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                        :formatter="positionFormat"
                    ></el-table-column>
                     <el-table-column
                        prop="birthday"
                        label="出生日期"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                     <el-table-column
                        prop="phone"
                        label="手机号"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                       <el-table-column
                        prop="email"
                        label="邮箱"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                       <el-table-column
                        prop="education"
                        label="学历"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                       <el-table-column
                        prop="university"
                        label="学校"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="status"
                        label="状态"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    >
           <template slot-scope="scope">
          <el-tag v-if="scope.row.status==0" type="warning">试用</el-tag>
          <el-tag v-if="scope.row.status==1">转正</el-tag>
          <el-tag v-if="scope.row.status==2" type="danger">离职</el-tag>
        </template>
                    </el-table-column>
                          <el-table-column
                        prop="salary"
                        label="薪资"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="overtime_pay"
                        label="加班费"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        
                          <el-table-column
                        prop="traffic_allowance"
                        label="交通补助"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        
                          <el-table-column
                        prop="performance"
                        label="绩效"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                         
                               <el-table-column
                        prop="endowment_insurance"
                        label="养老保险"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                               <el-table-column
                        prop="unemploymen_insurance"
                        label="失业保险"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="medical_insurance"
                        label="医疗保险"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="housing_fund"
                        label="住房公积金"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                          <el-table-column
                        prop="education_ch"
                        label="子女教育扣除"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                         <el-table-column
                        prop="support"
                        label="赡养扣除"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                         <el-table-column
                        prop="renting"
                        label="租房扣除"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                    ></el-table-column>
                        
                     <el-table-column
                        prop="leader_id"
                        label="上级领导"
                        width="auto"
                        show-overflow-tooltip
                        align="center"
                        :formatter="leaderFormat"
                    ></el-table-column>
                    
                    <el-table-column label="操作" align="center" fixed="right" width="200px">
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                 @click="editEvent(scope.$index, scope.row)"
                                >修改</el-button
                            >
                            <el-button
                                size="mini"
                                type="primary"
                                style="background-color: 1aa094"
                                @click="delEvent(scope.row.uid)"
                                >删除</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block page" style="text-align: center" v-show="pageShow">
                 <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5,10,20,30]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="mytotal">
                  </el-pagination>
            </div>
         </div>
        <div class="layui-tab-brief" v-show="addShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormAdd" status-icon :rules="rulesAdd" ref="ruleFormAdd" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <el-form-item label="头像" prop="content">
                                    <el-upload
                                        class="upload-demo"
                                        action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                        :limit="1"
                                        :http-request="handlePost"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <el-button size="small" type="primary"><i class="layui-icon"></i>上传头像</el-button>
                                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="uid">
                                        <el-select v-model="ruleFormAdd.uid" placeholder="请输入用户名">
                                            <el-option
                                                v-for="item in optionsUser3"
                                                :key="item.id"
                                                :label="item.username"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">性别</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormAdd.gender">
                                        <el-radio  :label="'男'"  @click.native.prevent="clickitem1('男')">男</el-radio>
                                        <el-radio  :label="'女'"  @click.native.prevent="clickitem1('女')">女</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="入职时间" prop="entrydate">
                                        <el-date-picker
                                            v-model="ruleFormAdd.entrydate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择入职日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                               <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="试用期时间" prop="tryoutdate">
                                        <el-date-picker
                                            v-model="ruleFormAdd.tryoutdate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择试用期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="转正时间" prop="justdate">
                                        <el-date-picker
                                            v-model="ruleFormAdd.justdate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择转正时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="职称" prop="position_id">
                                        <el-select v-model="ruleFormAdd.position_id"  placeholder="职位">
                                            <el-option
                                                v-for="item in positionList"
                                                :key="item.id"
                                                :label="item.position"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="出生日期" prop="birthday">
                                        <el-date-picker
                                            v-model="ruleFormAdd.birthday"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择出生日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input type="number" v-model="ruleFormAdd.phone" placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input  v-model="ruleFormAdd.email" placeholder="请输入邮箱"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="学历" prop="education">
                                        <el-select v-model="ruleFormAdd.education" placeholder="请输入学历">
                                            <el-option
                                                v-for="item in optionsedu"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="学校" prop="university">
                                        <el-input  v-model="ruleFormAdd.university" placeholder="请输入学校"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormAdd.status">
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">试用</el-radio>
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">转正</el-radio>
                                        <el-radio  :label="2"  @click.native.prevent="clickitem(2)">离职</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="薪资" prop="salary">
                                        <el-input type="number" v-model="ruleFormAdd.salary" placeholder="请输入薪资"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="加班费" prop="overtime_pay">
                                        <el-input type="number" v-model="ruleFormAdd.overtime_pay" placeholder="请输入加班费"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                           
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="交通补助" prop="traffic_allowance">
                                        <el-input type="number" v-model="ruleFormAdd.traffic_allowance" placeholder="请输入交通补助"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                          
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="绩效" prop="performance">
                                        <el-input type="number" v-model="ruleFormAdd.performance" placeholder="请输入绩效"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                          
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="养老保险" prop="endowment_insurance">
                                        <el-input type="number" v-model="ruleFormAdd.endowment_insurance" placeholder="请输入养老保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="失业保险" prop="unemploymen_insurance">
                                        <el-input type="number" v-model="ruleFormAdd.unemploymen_insurance" placeholder="请输入失业保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="医疗保险" prop="medical_insurance">
                                        <el-input type="number" v-model="ruleFormAdd.medical_insurance" placeholder="请输入医疗保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="住房公积金" prop="housing_fund">
                                        <el-input type="number" v-model="ruleFormAdd.housing_fund" placeholder="请输入住房公积金"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="子女教育扣除" prop="education_ch">
                                        <el-input type="number" v-model="ruleFormAdd.education_ch" placeholder="请输入子女教育扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="赡养扣除" prop="support">
                                        <el-input type="number" v-model="ruleFormAdd.support" placeholder="请输入赡养扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="租房扣除" prop="renting">
                                        <el-input type="number" v-model="ruleFormAdd.renting" placeholder="请输入租房扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="上级领导" prop="leader_id">
                                      <el-select v-model="ruleFormAdd.leader_id" placeholder="请输入上级领导">
                                           <el-option
                                                v-for="item in optionsUser2"
                                                :key="item.uid"
                                                :label="item.username"
                                                :value="item.uid">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <!--<vue-html5-editor :content="ruleFormAdd.content_resume" :height="300" @change="updateData"></vue-html5-editor>-->
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormAdd('ruleFormAdd')" v-show="chang('/master/staffMessage/set')">添加</el-button>
                                            <el-button @click="resetForm('ruleFormAdd')">返回</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="layui-tab-brief" v-show="editShow">
            <div class="layui-tab-content">
                <div class="layui-tab-item layui-show">
                    <div class="layui-form form-container">
                        <el-form :model="ruleFormEdit" status-icon :rules="rulesEdit" ref="ruleFormEdit" label-width="100px" class="demo-ruleForm">
                            <div class="layui-form-item">
                                <el-form-item label="头像图片" prop="content">
                                    <!-- action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"-->
                                    <el-upload
                                        class="upload-demo"
                                        action="https://neibu.qklshequ.com/bbs/master/file/uploadimg"
                                        :limit="1"
                                        :http-request="handlePost"
                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                        <el-button size="small" type="primary"><i class="layui-icon"></i>上传头像</el-button>
                                        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                    </el-upload>
                                </el-form-item>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="用户名" prop="uid">
                                        <el-select v-model="ruleFormEdit.uid" placeholder="请输入用户名" disabled>
                                            <el-option
                                                v-for="item in optionsUser3"
                                                :key="item.id"
                                                :label="item.username"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">性别</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormEdit.gender">
                                        <el-radio  :label="'男'"  @click.native.prevent="clickitem1('男')">男</el-radio>
                                        <el-radio  :label="'女'"  @click.native.prevent="clickitem1('女')">女</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                              <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="入职时间" prop="entrydate">
                                        <el-date-picker
                                            v-model="ruleFormEdit.entrydate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择入职日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                               <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="试用期时间" prop="tryoutdate">
                                        <el-date-picker
                                            v-model="ruleFormEdit.tryoutdate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择试用期时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="转正时间" prop="justdate">
                                        <el-date-picker
                                            v-model="ruleFormEdit.justdate"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择转正时间">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="职称" prop="position_id">
                                        <el-select v-model="ruleFormEdit.position_id"  placeholder="职位">
                                            <el-option
                                                v-for="item in positionList"
                                                :key="item.id"
                                                :label="item.position"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="出生日期" prop="birthday">
                                        <el-date-picker
                                            v-model="ruleFormEdit.birthday"
                                            type="date"
                                            value-format="yyyy-MM-dd"
                                            placeholder="选择出生日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="手机号" prop="phone">
                                        <el-input type="number" v-model="ruleFormEdit.phone" placeholder="请输入手机号"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="邮箱" prop="email">
                                        <el-input  v-model="ruleFormEdit.email" placeholder="请输入邮箱"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline">
                                    <el-form-item label="学历" prop="education">
                                        <el-select v-model="ruleFormEdit.education" placeholder="请输入学历">
                                            <el-option
                                                v-for="item in optionsedu"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="学校" prop="university">
                                        <el-input  v-model="ruleFormEdit.university" placeholder="请输入学校"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item" style="margin-bottom:15px">
                                <label class="layui-form-label">状态</label>
                                <div class="layui-input-inline" style="margin-top:10px;">
                                    <el-radio-group v-model="ruleFormEdit.status">
                                        <el-radio  :label="0"  @click.native.prevent="clickitem(0)">试用</el-radio>
                                        <el-radio  :label="1"  @click.native.prevent="clickitem(1)">转正</el-radio>
                                        <el-radio  :label="2"  @click.native.prevent="clickitem(2)">离职</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="薪资" prop="salary">
                                        <el-input type="number" v-model="ruleFormEdit.salary" placeholder="请输入薪资"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="加班费" prop="overtime_pay">
                                        <el-input type="number" v-model="ruleFormEdit.overtime_pay" placeholder="请输入加班费"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                           
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="交通补助" prop="traffic_allowance">
                                        <el-input type="number" v-model="ruleFormEdit.traffic_allowance" placeholder="请输入交通补助"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="绩效" prop="performance">
                                        <el-input type="number" v-model="ruleFormEdit.performance" placeholder="请输入绩效"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                           
                           
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="养老保险" prop="endowment_insurance">
                                        <el-input type="number" v-model="ruleFormEdit.endowment_insurance" placeholder="请输入养老保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="失业保险" prop="unemploymen_insurance">
                                        <el-input type="number" v-model="ruleFormEdit.unemploymen_insurance" placeholder="请输入失业保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="医疗保险" prop="medical_insurance">
                                        <el-input type="number" v-model="ruleFormEdit.medical_insurance" placeholder="请输入医疗保险"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="住房公积金" prop="housing_fund">
                                        <el-input type="number" v-model="ruleFormEdit.housing_fund" placeholder="请输入住房公积金"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="子女教育扣除" prop="education_ch">
                                        <el-input type="number" v-model="ruleFormEdit.education_ch" placeholder="请输入子女教育扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="赡养扣除" prop="support">
                                        <el-input type="number" v-model="ruleFormEdit.support" placeholder="请输入赡养扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="租房扣除" prop="renting">
                                        <el-input type="number" v-model="ruleFormEdit.renting" placeholder="请输入租房扣除"></el-input>
                                    </el-form-item>
                                </div>
                            </div>
                             <div class="layui-form-item">
                                <div class="layui-input-inline inp">
                                    <el-form-item label="上级领导" prop="leader_id">
                                       <el-select v-model="ruleFormEdit.leader_id" placeholder="请输入上级领导">
                                           <el-option
                                                v-for="item in optionsUser"
                                                :key="item.uid"
                                                :label="item.username"
                                                :value="item.uid">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="btable-paged">
                                <div class="layui-main">
                                    <div class="formbtngroup">
                                        <el-form-item>
                                            <el-button type="primary" @click="submitFormEdit('ruleFormEdit')" v-show="chang('/master/staffMessage/update')">更新</el-button>
                                            <el-button @click="resetForm('ruleFormEdit')">返回</el-button>
                                        </el-form-item>
                                    </div>
                                </div>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="layui-container" v-show="detailShow">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md11 content detail">
                    <div class="fly-panel detail-box">
                        <div class="detail-about">
                            <a class="fly-avatar" href="javascript:;">
                                <img :src="url+data.userhead" alt=""> </a>
                            <div class="fly-detail-user">
                                <a href="javascript:;" class="fly-link">
                                    <cite>{{data.username}}</cite>
                                </a>
                            </div>
                            <div class="detail-hits" id="LAY_jieAdmin" data-id="437">
                                <span>时间:	{{data.add_time}} </span>
                            </div>
                        </div>

                        <div class="detail-body photos" style="min-height:100px;">
                            <div class="wangEditor-container cl" style="border: 0px solid #e6e6e6;">

                                <div class="wangEditor-txt" style="padding: 0;margin-top: 0;">
                                    <p v-html="data.content_resume"></p>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="fly-panel detail-box" id="flyReply">
                        <div id="comment"></div>
                        <fieldset class="layui-elem-field layui-field-title" style="text-align: center;">
                            <legend>回帖</legend>
                        </fieldset>
                        <ul class="jieda">
                            <li class="jieda-daan" v-for="(replyItem,index) in replyData" :key="index">
                                <div class="detail-about detail-about-reply">
                                    <a class="fly-avatar" href="javascript:;">
                                        <img :src="url+replyItem.userhead" alt=""/> </a>
                                    <div class="fly-detail-user">
                                        <a href="javascript:;" class="fly-link">
                                            <cite class="username">{{replyItem.username}}</cite>
                                        </a>
                                    </div>
                                    <div class="detail-hits">
                                        <span>{{replyItem.time}}</span>
                                    </div>
                                </div>
                                <div class="detail-body jieda-body photos">
                                    <p v-html="replyItem.content"></p>
                                </div>
                                <div class="jieda-reply">
                        <span type="edit" @click="delEvent1(replyItem.id)" >
                            <a style="color:#999" data-id="490"  class="del_btn" v-show="chang('/master/commentresume/delete')">
                                <i class="iconfont icon-guanbi"></i>删除
                            </a>
                        </span>
                                </div>
                            </li>
                        </ul>
                        <div v-show="pageShow1">
                            <el-pagination
                                @current-change="handleCurrentChange1"
                                :current-page="currentPage1"
                                :page-size="pageSize1"
                                layout="total, prev, pager, next"
                                :total="totalCount">
                            </el-pagination>
                        </div>

                        <div class="layui-form" style="margin-top:20px;" id="reply">
                            <form>
                                <div class="layui-form-item layui-form-text" style="margin-bottom:20px;">
                                    <div class="edit_container">
                                        <vue-html5-editor :content="contents" :height="300" @change="updateData1"></vue-html5-editor>
                                    </div>

                                </div>
                                <div class=" layui-form-item">
                                    <el-button type="primary" @click="submit" class="layui-btn" v-show="chang('/master/commentresume/add')">提交回答</el-button>
                                    <el-button @click="resetForm"  type="danger">返回</el-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'information',
        data() {
            var sj = (rule, value, callback) => {
                if (value) {
                    // var reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
                    var reg = /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入有效的手机号'));
                    }else{
                        callback();
                    }
                } else {
                    callback()
                }
            };
            var emails = (rule, value, callback) => {
                if (value) {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入有效的邮箱'));
                    }else{
                        callback();
                    }
                } else {
                    callback()
                }
            };
            var money = (rule, value, callback) => {
                if (value) {
                    var reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
                    if (!reg.test(value)) {
                        callback(new Error('请输入正确格式0.00'));
                    }else{
                        callback();
                    }
                }else{
                    callback();
                }
            };
            return {
                url: this.GLOBAL.baseUrl,
//              编辑器内容
                content:'',
                signList:[],
                signListFilter:[],
                options:[],
                optionsUser:[],
                optionsUser2:[],
                optionsUser3:[],
                value: '',
                username:'',
                position:'',
                time:"",
                id:'',
                currentPage:1,
                mytotal:0,
                pageSize:10,
                pageNum:1,
                pageShow:true,
                auth:[],
                menuShow:true,
                addShow:false,
                editShow:false,
                detailShow:false,
                imageUrl: '',
                imageUrl1:"",
                ruleFormAdd: {
                    uid:'',
                    gender:"男",
                    entrydate:'',
                    tryoutdate:'',
                    justdate:'',
                    position_id:'',
                    birthday:'',
                    phone:'',
                    email:'',
                    education:'',
                    university:'',
                    status:'',
                    salary:'',
                    overtime_pay:'',
                    // meal_subsidy:'',
                    traffic_allowance:'',
                    // attendance_bonus:'',
                    performance:'',
                    // other:'',
                    // award:'',
                    endowment_insurance:'',
                    unemploymen_insurance:'',
                    medical_insurance:'',
                    housing_fund:'',
                    education_ch:'',
                    support:'',
                    renting:'',
                    // adult_education:20,
                    leader_id:'0'
        },
                rulesAdd: {
                    uid: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ],
                    entrydate:[
                        { required: true, message: '请输入职时间', trigger: 'blur' }
                    ],
                     tryoutdate:[
                        { required: true, message: '请输入试用期时间', trigger: 'blur' }
                    ],
                    position_id: [
                        { required: true, message: '请输入职称', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请输入状态', trigger: 'blur' }
                    ],
                    salary: [
                        { required: true, message: '请输入薪资', trigger: 'blur' },
                        {validator: money, trigger: 'blur'}
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        {validator: sj, trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {validator: emails, trigger: 'blur'}
                    ],
                    education:[
                      { required: true, message: '请输入学历', trigger: 'blur' },
                    ],
                    overtime_pay: [
                        {validator: money, trigger: 'blur'}
                    ],
                    meal_subsidy: [
                        {validator: money, trigger: 'blur'}
                    ],
                    traffic_allowance: [
                        {validator: money, trigger: 'blur'}
                    ],
                    attendance_bonus: [
                        {validator: money, trigger: 'blur'}
                    ],
                    performance: [
                        {validator: money, trigger: 'blur'}
                    ],
                    other: [
                        {validator: money, trigger: 'blur'}
                    ],
                    award: [
                        {validator: money, trigger: 'blur'}
                    ],
                    endowment_insurance:[
                        {validator: money, trigger: 'blur'}  
                    ],
                    unemploymen_insurance:[
                        {validator: money, trigger: 'blur'}
                    ],
                    medical_insurance:[
                       {validator: money, trigger: 'blur'}
                    ],
                    housing_fund:[
                        {validator: money, trigger: 'blur'}
                    ],
                    education_ch:[
                        {validator: money, trigger: 'blur'}
                    ],
                    support:[
                        {validator: money, trigger: 'blur'}
                    ],
                    renting:[
                        {validator: money, trigger: 'blur'}
                    ],
                    adult_education:[
                       {validator: money, trigger: 'blur'}
                    ],
                    leader_id:[
                        { required: true, message: '请输入上级领导', trigger: 'blur' }
                    ]
                },
                ruleFormEdit: {
                    id:"",
                    uid:'',
                    gender:"男",
                     entrydate:'',
                    tryoutdate:'',
                    justdate:'',
                    position_id:'',
                    birthday:'',
                    phone:'',
                    email:'',
                    education:'',
                    university:'',
                    status:'',
                    salary:'',
                    overtime_pay:'',
                    // meal_subsidy:'',
                    traffic_allowance:'',
                    // attendance_bonus:'',
                    performance:'',
                    // other:'',
                    // award:"",
                    endowment_insurance:'',
                    unemploymen_insurance:'',
                    medical_insurance:'',
                    housing_fund:'',
                    education_ch:'',
                    support:'',
                    renting:'',
                    // adult_education:'',
                    leader_id:''
                },
                rulesEdit: {
                    uid: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    gender: [
                        { required: true, message: '请输入性别', trigger: 'blur' }
                    ],
                     entrydate:[
                        { required: true, message: '请输入职时间', trigger: 'blur' }
                    ],
                     tryoutdate:[
                        { required: true, message: '请输入试用期时间', trigger: 'blur' }
                    ],
                    position_id: [
                        { required: true, message: '请输入职称', trigger: 'blur' }
                    ],
                    status: [
                        { required: true, message: '请输入状态', trigger: 'blur' }
                    ],
                    salary: [
                        { required: true, message: '请输入薪资', trigger: 'blur' },
                        {validator: money, trigger: 'blur'}
                    ],
                    phone: [
                        {validator: sj, trigger: 'blur'}
                    ],
                    email: [
                        {validator: emails, trigger: 'blur'}
                    ],
                    overtime_pay: [
                        {validator: money, trigger: 'blur'}
                    ],
                    meal_subsidy: [
                        {validator: money, trigger: 'blur'}
                    ],
                    traffic_allowance: [
                        {validator: money, trigger: 'blur'}
                    ],
                    attendance_bonus: [
                        {validator: money, trigger: 'blur'}
                    ],
                    performance: [
                        {validator: money, trigger: 'blur'}
                    ],
                    other: [
                        {validator: money, trigger: 'blur'}
                    ],
                    award: [
                        {validator: money, trigger: 'blur'}
                    ],
                     endowment_insurance:[
                        {validator: money, trigger: 'blur'}  
                    ],
                    unemploymen_insurance:[
                        {validator: money, trigger: 'blur'}
                    ],
                    medical_insurance:[
                       {validator: money, trigger: 'blur'}
                    ],
                    housing_fund:[
                        {validator: money, trigger: 'blur'}
                    ],
                    education_ch:[
                        {validator: money, trigger: 'blur'}
                    ],
                    support:[
                        {validator: money, trigger: 'blur'}
                    ],
                    renting:[
                        {validator: money, trigger: 'blur'}
                    ],
                    adult_education:[
                       {required: true, message: '请输入扣除金额', trigger: 'blur' }
                    ],
                    leader_id:[
                        { required: true, message: '请输入上级领导', trigger: 'blur' }
                    ]
                },
                data: '',
                replyData: [],
                totalCount: 0,
                currentPage1: 1,
                pageSize1: 5,
                pageShow1: false,
                contents:"",
                infoId:"",
                uid:'',
                positionList:[],
                leaderList:[],
                optionsedu:[
                    {
                        value: '博士',
                        label: '博士'
                    },
                    {
                        value: '硕士',
                        label: '硕士'
                    },
                    {
                        value: '本科',
                        label: '本科'
                    },
                    {
                        value: '大专',
                        label: '大专'
                    },
                    {
                        value: '高中',
                        label: '高中'
                    },
                    {
                        value: '初中',
                        label: '初中'
                    },
                    {
                        value: '小学',
                        label: '小学'
                    },
                ],
            }
        },
       
        methods: {
         //职位名称数据的格式化
         positionFormat(row,column){
       
            // this.positionList.forEach(item => {
            //    if(item.id==row.position_id){
            //        console.log('hahaha')
            //        return item.position
            //    }
            // });

         for(var i=0,l=this.positionList.length;i<l;i++){
         if(row.position_id==this.positionList[i].id){
           return this.positionList[i].position
         }
       }
         },

         //上级领导数据的格式化
         leaderFormat(row,column){ 
         for(var i=0,l=this.optionsUser.length;i<l;i++){
            if(row.leader_id==this.optionsUser[i].uid){
           return this.optionsUser[i].username
         }
              }
         },


            daoEvent(){
                var me=this;
                if(me.signList==undefined){
                    this.$message.error("没有可以导出的数据");
                    return;
                }
                if(me.signList.length ==0||me.signList.length ==undefined){
                    this.$message.error("没有可以导出的数据");
                }else{
                    me.$axios({ // 用axios发送post请求
                        method: 'post',
                        url: me.url+"master/staffMessage/staffMessageExcel", // 请求地址
                        data:{
                            username:this.username,
                            position_id:this.position,
                        },
                        responseType: 'blob', // 表明返回服务器返回的数据类型'arraybuffer'"blob"
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => { // 处理返回的文件流
                        const BLOB = res.data
                        // FileReader 对象允许Web应用程序异步读取存储在用户计算机上的文件的内容
                        const fileReader = new FileReader()
                        // 开始读取指定的Blob中的内容。读取完成result属性中将包含一个data: URL格式的Base64字符串以表示所读取文件的内容
                        fileReader.readAsDataURL(BLOB)
                    // 处理load事件，该事件在读取操作完成时触发
                    fileReader.onload = (event) => {
                        let a = document.createElement('a')
                        a.download = `员工信息.xls`
                        a.href = event.target.result
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                    }
                })
                }
            },
            updateData(e = "") {
                let c1 = e.replace(/<img style="margin:auto;display:table;" width="70%"/g, "<img");
                let c2 = c1.replace(/<img/g, '<img style="margin:auto;display:table;" width="70%"');
                this.ruleFormAdd.content_resume = c2;
                this.ruleFormEdit.content_resume = c2;

            },
            updateData1(e = "") {
                let c1 = e.replace(/<img style="margin:auto;display:table;" width="70%"/g, "<img");
                let c2 = c1.replace(/<img/g, '<img style="margin:auto;display:table;" width="70%"');
                this.contents = c2;
            },
//           权限的接口
            authorityEvent(){
                var me=this;
                me.$axios.post(me.url+"master/auth")
                    .then(function (result) {
                        me.auth=result.data;
                          this.auth=result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            chang(name){
                var type=false;
                this.auth.forEach(function(i,v){
                    if(i==name){
                        type=true;
                    }
                });

                return type;
            },
            addEvent(){
            
              this.addShow=true;
              this.editShow=false;
              this.menuShow=false;
              this.ruleFormAdd.status=0;
              this.imageUrl='';
              this.ruleFormAdd.content=''
              this.userEvent();
            },
            editEvent(index,val){
                var me=this;
                me.addShow=false;
                me.editShow=true;
                me.menuShow=false;
                me.ruleFormEdit = val;
               
              
                if(val.content!=''){
                    me.imageUrl1=me.url+val.content;
                }
            },
            delEvent(id){
                  this.$confirm('您确定要删除么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true,
           })
           .then(()=>{
             
                console.log(id)
                var me=this;
                me.$axios.post(me.url+"master/staffMessage/delete?uid="+id)
                    .then(function (result) {
                        if(result.data.result==false){
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                        if(result.data.result==true){
                            me.$message({
                                message: '删除成功',
                                type: 'success'
                            })
                            me.signEvent();
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
           })
            .catch(()=>{
               this.$message({
            type: 'info',
            message: '已取消删除'
          });
           })

            },
            clickitem(status){
                this.ruleFormAdd.status=status;
                this.ruleFormEdit.status=status
            },
            clickitem1(status){
                this.ruleFormAdd.gender=status;
                this.ruleFormEdit.gender=status
            },
            signEvent(){
                var me=this;
                let fordata = new FormData();
                // fordata.append('username',this.username)
                // fordata.append('position_id',this.position)
               if(this.username==''&&this.position==''){
                fordata.append('page',this.currentPage)
                fordata.append('size',this.pageSize)
                }
               else {
                  fordata.append('username',this.username)
                fordata.append('position_id',this.position)
              }
                this.$axios.post(this.$baseUrl+"master/staffMessage/list",fordata)
                    .then(result=> {
                        // result.data.list.forEach(function(index){
                        //     if(index.status==0){
                        //         index.status1='试用'
                        //     }
                        //     if(index.status==1){
                        //         index.status1='转正'
                        //     }
                        //     if(index.status==2){
                        //         index.status1='离职'
                        //     }
                        //     this.positionList.forEach(function(item){
                        //         if(index.position_id==item.id){
                        //             index.position_id1=item.position
                        //         }
                        //    })
                        // })
                        this.currentPage=result.data.pageNum;
                        this.pageSize=result.data.pageSize
                        this.signList=result.data.list;
                        this.signListFilter=this.signList.filter(item=>item.leader_id!='0')
                        console.log(this.signList)
                        this.mytotal=result.data.total;
                        // this.mytotal=this.signListFilter.length;
                        // if(this.mytotal<10){
                        //     this.pageShow=false
                        // }else{
                        //     this.pageShow=true
                        // }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            handleSizeChange(val) {
                this.pageSize=val;
                this.signEvent();
            },
            handleCurrentChange(val) {
                this.currentPage=val;
                this.signEvent();
            },
            getuser(){
                var me=this;
                me.signEvent()
            },
            getmobile(){
                var me=this;
                me.signEvent()
            },
            submitFormAdd(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        // 添加数据
                        me.$axios.post(me.url+"master/staffMessage/set", me.ruleFormAdd)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '添加成功',
                                        type: 'success'
                                    })
                                    me.signEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                    me.imageUrl='';
                                    me.ruleFormAdd={
                                        uid:'',
                                        gender:"男",
                                        position_id:'',
                                        birthday:'',
                                        phone:'',
                                        email:'',
                                        education:'',
                                        university:'',
                                        status:'',
                                        salary:'',
                                        overtime_pay:'',
                                        meal_subsidy:'',
                                        traffic_allowance:'',
                                        attendance_bonus:'',
                                        performance:'',
                                        other:''
                                    }
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
                        return false;
            }
            });
            },

            submitFormEdit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        var me=this;
                        me.$axios.post(me.url+"master/staffMessage/update",me.ruleFormEdit)
                            .then(function (result) {
                                if(result.data.result==false){
                                    me.$message({
                                        message: result.data.msg,
                                        type: 'error'
                                    })
                                }
                                if(result.data.result==true){
                                    me.$message({
                                        message: '修改成功',
                                        type: 'success'
                                    })
                                    me.signEvent();
                                    me.menuShow=true;
                                    me.addShow=false;
                                    me.editShow=false;
                                }

                            })
                            .catch(function (error) {
                                console.log(error);
                            })
                    } else {
//                        console.log('error submit!!');
                        return false;
            }
            });
            },
            resetForm(formName) {
                this.addShow=false;
                this.editShow=false;
                this.menuShow=true;
                this.detailShow=false;
            },
//            上传头像
            handlePost(f) {
                var me = this;
                let fd = new FormData()
                fd.append('file', f.file)
                me.$axios.post('https://neibu.qklshequ.com/bbs/'+ "master/file/uploadimg", fd)
                    .then(function (result) {
                        if (result.data.result == true) {
                            me.$message({
                                message: '上传成功',
                                type: 'success'
                            })
                            me.imageUrl='https://neibu.qklshequ.com/bbs'+result.data.pojo;
                            me.ruleFormAdd.content=result.data.pojo;
                            me.ruleFormEdit.content=result.data.pojo;
                        }
                        if (result.data.result == false) {
                            me.$message({
                                message: result.data.msg,
                                type: 'error'
                            })
                        }
                    })
            },
            handleAvatarSuccess(res, file) {
                console.log(res.pojo)
                this.userhead=res.pojo
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$message.success('上传头像成功');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isPNG = file.type === 'image/png';
                const isGif = file.type === 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG  && !isGif ) {
                    this.$message.error('上传头像图片只能是 JPG、PNG、GIF 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG || isPNG  || isGif  && isLt2M;
            },
            detailsEvent(id){
                this.uid=id;
                this.addShow=false;
                this.editShow=false;
                this.menuShow=false;
                this.detailShow=true;
                var me=this;
                me.$axios.post(me.url + "/master/resume/get?uid=" + id)
                    .then(function (result) {
                        me.data = result.data;
                        me.infoId=result.data.id;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            getReply(mypages){
                var me = this;
                me.$axios.post(me.url + "master/commentresume/bypage?id=" + this.infoId + "&page=" + mypages + "&size=" + this.pageSize1)
                    .then(function (result) {
                        me.replyData = result.data.list;
                        me.totalCount = result.data.total;
                        if (me.totalCount> 0) {
                            me.pageShow1 = true
                        }
                        else {
                            me.pageShow1 = false
                        }
                    })
                    .catch(function (error) {

                    });
            },
//            发表回复
            submit(){
                var me = this;
                if (me.contents == '') {
                    me.$message.error('请输入内容!');
                    return;
                }
                var contents = {
                    uid: this.uid,
                    rid:this.infoId,
                    content: me.contents,
                }
                me.$axios.post(me.url + "master/commentresume/add", contents)
                    .then(function (result) {
//                    console.log(result)
                        if (result.data.result == true) {
                            me.$message.success('提交成功!');
                        }
                        //将文本框中的值清空
                        me.contents = "";
                        //直接将列表数据重新加载一次
                        me.getReply(1);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });


            },
            handleSizeChange1(val) {
                this.pageSize1=val;
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange1(val) {
                var me = this;
                me.getReply(val)
            },

//        自己删除回复
            delEvent1(id){
                var me = this;
                me.$axios.post(me.url + "/master/commentresume/delete?id=" + id)
                    .then(function (result) {
                        me.getReply(1);
                        me.$message({
                            type: 'success',
                            message: result.data.msg
                        });
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            positionEvent(){
                var me = this;
                me.$axios.post(me.url+"master/position/getPosition")
                    .then(function (result) {
                        me.positionList=result.data
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
           async userEvent(){
                let res=await this.$axios.post(this.url+'master/staffMessage/staffList')
                this.optionsUser=res.data.pojo
                this.optionsUser2=res.data.pojo
                let obj={
                    uid:'0',
                    username:'无上级领导'
                }
            this.optionsUser2.push(obj);
            //  this.optionsUser2=this.optionsUser2.push(obj).reverse();
            },
            async userEvent2(){
                let res=await this.$axios.post(this.url+'master/user/list')
                this.optionsUser3=res.data
            }
        },
        created(){
             var me=this;
            this.userEvent();
            this.userEvent2();
            me.positionEvent();
            this.signEvent();
            me.authorityEvent();
//           所属权限组
            me.$axios.post(me.url+"master/staffMessage/grouplist")
                .then(function (result) {
                    me.options=result.data
                })
                .catch(function (error) {
                    console.log(error);
                });
//            用户权限


//            帖子回复
            me.getReply(parseInt(this.currentPage))
        }


    }
</script>

<style lang="less" >
    @import '../../style/mixin';
    .layui-form{
        overflow:hidden;
    }
    .layui-field-box {
        padding: 5px 15px;
    }
    .page{
        position: fixed;
        bottom:20px;
        right:20px;
        width:100%;
        overflow: hidden;
    }
    .layui-tab-content{
        overflow-y: scroll!important;
    }
    .layui-form-item .layui-input-inline {
        width: auto!important;
    }
    .layui-form-item {
        margin-bottom:0px;
    }
    .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width: 200px;
    }
    .inp .el-form-item__content .el-input .el-input__inner{
        width: 200px;
    }
    .el-upload img {
        max-height: 200px;
    }
    .el-upload-list__item-name{
        display:none!important;
    }
    .upload-demo .el-upload-list{
        display:none;
    }
    .dao{
        width:60px;
        height:33px;
        border: 1px solid #dcdfe6;
        line-height:33px;
        text-align: center;
    }
  .info ::-webkit-scrollbar {
   
    height: 5px !important;
    background-color: #F5F5F5;
}
  .info .layui-form {
 overflow: hidden;
}

.info .layui-tab-content {
    overflow: hidden;
}
.info .page{
    overflow: hidden;
}
</style>
