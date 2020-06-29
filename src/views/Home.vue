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
                <!--<el-submenu index="browse">-->
                    <!--<template slot="title">浏览</template>-->
                    <!--<el-menu-item index="browsePerson">作者</el-menu-item>-->
                    <!--<el-menu-item index="browseConferences">会议</el-menu-item>-->
                    <!--<el-menu-item index="browseJournals">期刊</el-menu-item>-->
                    <!--<el-menu-item index="browseSeries">系列</el-menu-item>-->
                <!--</el-submenu>-->
                <!--<el-submenu index="search">-->
                    <!--<template slot="title">搜索</template>-->
                    <!--<el-menu-item index="searchDblp">搜索dblp</el-menu-item>-->
                    <!--<el-menu-item index="searchByID">搜索ID</el-menu-item>-->
                <!--</el-submenu>-->
                <!--<el-submenu index="about">-->
                    <!--<template slot="title">浏览</template>-->
                    <!--<el-menu-item index="aboutFAQ">问题查找</el-menu-item>-->
                    <!--&lt;!&ndash;//Frequently Asked Questions&ndash;&gt;-->
                    <!--<el-menu-item index="aboutTeam">团队</el-menu-item>-->
                    <!--&lt;!&ndash;//项目团队&ndash;&gt;-->
                    <!--<el-menu-item index="aboutLicense">许可</el-menu-item>-->
                    <!--&lt;!&ndash;//版权，许可，使用条款，免责声明&ndash;&gt;-->
                    <!--<el-menu-item index="aboutPrivacy">隐私</el-menu-item>-->
                    <!--&lt;!&ndash;//数据隐私政策&ndash;&gt;-->
                <!--</el-submenu>-->
                <el-menu-item style="width: 400px; float: right">
                    <el-input size="mini" v-model="searchInput" style="width: 80%; " clearable
                              @keyup.enter.native="searchJson" @keyup.space.native="addSpace"/>
                    <!--<el-button style="height: 28px;margin: 3px 0 0 5px" @click="searchJson"></el-button>-->
                </el-menu-item>
                <el-menu-item style="float: right">
                    <el-submenu index="searchLabel">
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
                            <!--<div>-->
                                <!--<el-radio :label="3" style="color: white">出版物搜索</el-radio>-->
                            <!--</div>-->
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
                            <span>Title允许使用一个字符串作为输。例如:</span><br>
                            <span style="margin-left: 10%">title:bigdata title中含有bigdata字符串的论文</span><br>
                            <span style="margin-left: 10%">注意：</span><br>
                            <span style="margin-left: 10%">1）title大小写不敏感，这意味着输入BigData也会返回bigdata的数据</span>
                            <el-divider></el-divider>
                            <span>Year允许输入一个整形数字，或者整形数字的Range。例如：</span><br>
                            <span style="margin-left: 10%">year:2019 查询2019的论文</span><br>
                            <span style="margin-left: 10%">year:2010..2020 查询2010到2020的论文</span><br>
                            <el-divider></el-divider>
                            <span>Author允许输入字符串或者字符串集合。例如:</span><br>
                            <span style="margin-left: 10%">author: Yang 查询含有作者姓名含有Yang的论文</span><br>
                            <span style="margin-left: 10%">author: Yang,mike 查询作者姓名的含有Yang或者mike的论文</span><br>
                            <span style="margin-left: 10%">注意：</span><br>
                            <span style="margin-left: 10%">1）作者姓名只允许精确匹配，这意味着当输入为Yan的时候，不会显示作者包含Yang的论文。</span><br>
                            <span style="margin-left: 10%">2）作者姓名大小写敏感，这意味着当输入为yan的时候，不会显示作者包含Yan的论文。</span>
                            <el-divider></el-divider>
                            <span>e.g.,title:distribut&year:2010..2020&author:tom,mike</span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-main v-if="flag">
                <el-image
                        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2420980653,1880035631&fm=26&gp=0.jpg"
                        fit="scale-down" style="width: 1000px;height: 660px"></el-image>
            </el-main>
            <Combined v-if="conbined" :text="propInput" @searchAuthor="searchAuthor"></Combined>
            <author v-if="author" :text="authorName" ></author>
            <publiaction v-if="publish" :text="propInput" @searchAuthor="searchAuthor"></publiaction>
            <searchAut @searchAuthor="searchAuthor" v-if="searchAut" :text="propInput"></searchAut>
            <!--<router-view></router-view>-->
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src


    import Combined from "./children/combined";
    import Author from "./children/author"
    import Publiaction from "./children/publiaction";
    import SearchAut from "./children/searchAut";

    export default {
        name: 'Home',
        components: {SearchAut, Publiaction, Author, Combined},
        // components:{},
        data() {
            return {
                myRadioChose: 0,
                searchInput: "",
                flag: true,
                author: false,
                conbined: false,
                publish: false,
                searchAut: false,

                authorName: '',
                propInput:'',
            }
        },
        // props:['text'],
        methods: {
            redo() {
                this.flag = true;
                this.author = false;
                this.publish = false;
                this.conbined = false;
                this.searchAut = false;
            },

            changeInput(){
                this.propInput = this.searchInput;
            },

            searchAuthor(authorName) {
                this.authorName = authorName;
                this.flag = false;
                this.author = true;
                this.publish = false;
                this.conbined = false;
                this.searchAut = false;
                // console.log(authorName);
            },

            addSpace() {
                this.searchInput += ' ';
            },

            searchJson() {
                this.changeInput();
                switch (this.myRadioChose) {
                    case 0:
                        // console.log(this.myRadioChose);
                        console.log("searchInput" + this.searchInput);
                        this.flag = false;
                        this.author = false;
                        this.publish = false;
                        this.conbined = true;
                        this.searchAut = false;
                        break;
                    case 1:
                        this.flag = false;
                        this.author = false;
                        this.publish = false;
                        this.conbined = false;
                        this.searchAut = true;
                        break;
                    case 3:
                        this.flag = false;
                        this.author = false;
                        this.publish = true;
                        this.conbined = false;
                        this.searchAut = false;
                        break
                }
            },


        },

        mounted() {
            this.redo();
        }
    }
</script>
<style scoped>
    .homeBar {
        width: 100%;
        /*display: flex;*/
        justify-content: center;
    }

</style>
