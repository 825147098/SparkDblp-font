<template>
    <el-container>
        <el-header height="60px" class="homeBar">
            <el-menu mode="horizontal" background-color="#545c64" text-color="#fff">
                <!--<el-submenu index="homeMenue">-->
                    <!--<template slot="title">主页</template>-->
                    <!--<el-menu-item index="homeBlog">博客</el-menu-item>-->
                    <!--<el-menu-item index="homeStatistics">统计</el-menu-item>-->
                <!--</el-submenu>-->
                <el-menu-item index="Home" @click="redo">
                    <el-link href="localhost:8080/Home">主页</el-link>
                </el-menu-item>
                <el-submenu index="browse">
                    <template slot="title">浏览</template>
                    <el-menu-item index="browsePerson">作者</el-menu-item>
                    <el-menu-item index="browseConferences">会议</el-menu-item>
                    <el-menu-item index="browseJournals">期刊</el-menu-item>
                    <el-menu-item index="browseSeries">系列</el-menu-item>
                </el-submenu>
                <el-submenu index="search">
                    <template slot="title">搜索</template>
                    <el-menu-item index="searchDblp">搜索dblp</el-menu-item>
                    <el-menu-item index="searchByID">搜索ID</el-menu-item>
                </el-submenu>
                <el-submenu index="about">
                    <template slot="title">浏览</template>
                    <el-menu-item index="aboutFAQ">问题查找</el-menu-item>
                    <!--//Frequently Asked Questions-->
                    <el-menu-item index="aboutTeam">团队</el-menu-item>
                    <!--//项目团队-->
                    <el-menu-item index="aboutLicense">许可</el-menu-item>
                    <!--//版权，许可，使用条款，免责声明-->
                    <el-menu-item index="aboutPrivacy">隐私</el-menu-item>
                    <!--//数据隐私政策-->
                </el-submenu>
                <el-menu-item style="width: 400px; float: right"  @keyup.enter="searchJson">
                    <el-input size="mini" v-model="searchInput" style="width: 100%; "
                              @keyup.enter.native="searchJson"></el-input>
                </el-menu-item>
                <el-menu-item style="float: right">
                    <el-submenu>
                        <template slot="title">
                            <i class="el-icon-search"></i>
                        </template>
                        <el-radio-group v-model="myRadioChose" style="margin-left: 10px">
                            <div>
                                <el-radio :label="0" style="color: white" @click="searchJson">组合搜素</el-radio>
                            </div>
                            <div>
                                <el-radio :label="1" style="color: white">作者搜索</el-radio>
                            </div>
                            <!--<div>-->
                            <!--<el-radio :label="2" style="color: white">地点搜索</el-radio>-->
                            <!--</div>-->
                            <div>
                                <el-radio :label="3" style="color: white">出版物搜索</el-radio>
                            </div>
                            <!--<div>-->
                            <!--<el-radio :label="4" style="color: white">全文搜索</el-radio>-->
                            <!--</div>-->
                        </el-radio-group>
                    </el-submenu>
                </el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="400px" style="padding: 20px" v-if="flag">
                <el-tabs type="border-card">
                    <el-tab-pane>
                        <span slot="label">搜索规则</span>
                        <div style="font-size: 13px">
                            <span>不区分大小写的前缀搜索：默认值，</span><br>
                            <span>例如:sig匹配“ SIGIR”和“ signal”</span>
                            <el-divider></el-divider>
                            <span>精确的词搜索：在词后附加美元符号（$）</span><br>
                            <span>例如:graph $匹配“ graph”，但不匹配“ graphics”</span>
                            <el-divider></el-divider>
                            <span>布尔和：按空格分隔单词，</span><br>
                            <span>例如:codd &nbsp; model</span>
                            <el-divider></el-divider>
                            <span>布尔值或：用竖线符号（|）连接单词，</span><br>
                            <span>例如:graph|network</span>
                        </div>
                    </el-tab-pane>
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">作者划分</span>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">学科划分</span>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">类型划分</span>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">年份划分</span>-->
                    <!--</el-tab-pane>-->
                </el-tabs>
            </el-aside>
            <el-main v-if="flag">
                <el-image
                        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2420980653,1880035631&fm=26&gp=0.jpg"
                        fit="scale-down" style="width: 1000px;height: 660px"></el-image>
            </el-main>
            <Combined v-if="conbined" :text = "searchInput"></Combined>
            <author v-if="author" :text = "searchInput"></author>
            <publiaction v-if="publish" :text = "searchInput"></publiaction>
            <!--<router-view></router-view>-->
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src


    import Combined from "./children/combined";
    import Author from "./children/author"
    import Publiaction from "./children/publiaction";

    export default {
        name: 'Home',
        components: {Publiaction, Author, Combined},
        // components:{},
        data() {
            return {
                myRadioChose: 0,
                searchInput: "",
                flag: true,
                author: false,
                conbined: false,
                publish: false,


            }
        },
        // props:['text'],
        methods: {
            redo(){
                this.flag = true;
                this.author = false;
                this.publish = false;
                this.conbined = false;
            },

            searchJson() {
                switch (this.myRadioChose) {
                    case 0:
                        // console.log(this.myRadioChose);
                        // console.log(this.searchInput);
                        this.flag = false;
                        this.author = false;
                        this.publish = false;
                        this.conbined = true;
                        // this.$router.push(({path:'/conbined',query:{text:this.searchInput}}));
                        break;
                    case 1:
                        this.flag = false;
                        this.author = false;
                        this.publish = false;
                        this.conbined = false;
                        break;
                    case 3:
                        this.flag = false;
                        this.author = false;
                        this.publish = true;
                        this.conbined = false;
                        break
                }
            }
        },
    }
</script>
<style scoped>
    .homeBar {
        width: 100%;
        /*display: flex;*/
        justify-content: center;
    }

</style>
