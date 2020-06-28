<template>
    <el-container>
        <el-header height="60px">
            <h3 class="headline">Search &nbsp; For &nbsp; Publications</h3>
        </el-header>
        <el-container>
            <el-aside width="400px" style="padding: 20px">
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
                    <el-tab-pane >
                        <span slot="label">作者划分</span>
                        <div style="font-size: 13px" v-for="aut in autList" :key="aut" class="divider">
                            <el-button type="text" @click="searchAuthor(item)" size="small">
                                {{aut}}({{sortAuthor[aut].length}})
                            </el-button>
                        </div>
                    </el-tab-pane>
                    <!--<el-tab-pane :disabled=flag>-->
                        <!--<span slot="label">Veneu划分</span>-->
                        <!--<div style="font-size: 13px" v-for="item in venList" :key="item">-->
                            <!--{{item}}({{sortVen[item].length}})-->
                        <!--</div>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">类型划分</span>-->
                    <!--</el-tab-pane>-->
                    <el-tab-pane >
                        <span slot="label">年份划分</span>
                        <div style="font-size: 13px" v-for="years in nowYear" :key="years">
                            {{years}}({{sortData[years].length}})
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-main>
                <header class="hide-head">
                    <h2>Publication search results</h2>
                </header>
                <el-col>
                    <ul class="pub-list" v-for="year in nowYear " :key="year._VALUE">
                        <li>{{year}}</li>
                        <br>
                        <li v-for="item in sortData[year]" :key="item._VALUE"
                            style="display: inline;padding: 20px; width: 80%;margin: auto">
                            <el-link :href=item.ee[0]._VALUE style="padding-right: 20px" :underline="false">
                                <el-button circle icon="el-icon-document" size="mini"></el-button>
                            </el-link>
                            <cite style="display: table-cell; font: inherit; padding: 0 2px; max-width: 800px">
                    <span v-for="authors in item.author" :key="authors._VALUE">
                            {{authors._VALUE}}
                            <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                                        v-if="authors._orcid != null">
                                <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                          style="padding-left:0.25em;" alt=""></el-image>
                            </el-tooltip>
                        <span v-if="item.author.indexOf(authors) < item.author.length - 1">,</span>
                        </span>
                                :<br>
                                <span>{{item.title}}.</span>
                                <span v-for="school in item.school" :key="school">{{school}},</span>
                                <!--类型划分加链接-->
                                <span>{{item.publisher}}</span>
                                <span v-for="it in item.year" :key="it">{{it}}</span>,
                                <span v-if="item.isbn != null">ISBN &nbsp;</span>
                                <span v-for="isbn in item.isbn" :key="isbn">{{isbn}},</span>pp.
                                <span v-for="page in item.pages" :key="page">{{page}}</span>
                            </cite><br>
                        </li>
                    </ul>
                </el-col>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>

    import axios from 'axios';
    export default {
        name: "publiaction",
        data() {
            return {
                nowYear: [],
                publishData: [
                    {
                        "_id": {"$oid": "5eedef19310f336f410ac92b"},
                        "_key": "series/faia/2005-148",
                        "_mdate": "2020-01-31",
                        "author": [
                            {
                                "_VALUE": "Kristian Kersting"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://www.booksonline.iospress.nl/Content/View.aspx?piid=96"
                            },
                            {
                                "_VALUE": "http://d-nb.info/983957975"
                            }
                        ],
                        "isbn": ["978-1-58603-674-4"],
                        "pages": ["1-228"],
                        "publisher": "IOS Press",
                        "school": ["University of Freiburg, Germany"],
                        "series": {
                            "_VALUE": "Frontiers in Artificial Intelligence and Applications",
                            "_href": "db/series/faia/index.html"
                        },
                        "title": "An Inductive Logic Programming Approach to Statistical Relational Learning",
                        "volume": "148",
                        "year": [2005]
                    },
                    {
                        "_id": {"$oid": "5eedef19310f336f410ac92c"},
                        "_key": "series/lnbip/Weber09",
                        "_mdate": "2020-02-12",
                        "author": [
                            {
                                "_VALUE": "Ingo M. Weber",
                                "_orcid": "0000-0002-4833-5921"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "https://doi.org/10.1007/978-3-642-05085-5"
                            },
                            {
                                "_VALUE": "https://nbn-resolving.org/urn:nbn:de:1111-20091214234"
                            },
                            {
                                "_VALUE": "http://d-nb.info/998030961"
                            },
                            {
                                "_VALUE": "http://d-nb.info/999067885"
                            },
                            {
                                "_VALUE": "https://www.wikidata.org/entity/Q58196259"
                            }
                        ],
                        "isbn": ["978-3-642-05084-8", "978-3-642-05085-5"],
                        "pages": ["3-231"],
                        "publisher": "Springer",
                        "school": ["Karlsruhe Institute of Technology, Germany"],
                        "series": {
                            "_VALUE": "Lecture Notes in Business Information Processing",
                            "_href": "db/series/lnbip/index.html"
                        },
                        "title": "Semantic Methods for Execution-level Business Process Modeling - Modeling Support Through Process Verification and Service Composition",
                        "volume": "40",
                        "year": [2009]
                    },
                    {
                        "_id": {"$oid": "5eedef19310f336f410ac92d"},
                        "_key": "books/daglib/0068994",
                        "_mdate": "2017-01-09",
                        "author": [
                            {
                                "_VALUE": "Ulrich Junker"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://d-nb.info/930724283"
                            }
                        ],
                        "pages": ["I-VI, 1-187"],
                        "school": ["Kaiserslautern University of Technology, Germany"],
                        "title": "Relationships between assumptions.",
                        "year": [1992]
                    },
                    {
                        "_id": {"$oid": "5eedef19310f336f410ac92e"},
                        "_key": "books/daglib/0069997",
                        "_mdate": "2016-11-08",
                        "author": [
                            {
                                "_VALUE": "Johannes Reichardt"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://d-nb.info/860953998"
                            }
                        ],
                        "pages": ["1-120"],
                        "school": ["Darmstadt University of Technology, Germany"],
                        "title": "Invarianz der Parsingeigenschaft unter Grammatikmorphismen.",
                        "year": [1985]
                    },
                    {
                        "_id": {"$oid": "5eedef19310f336f410ac92f"},
                        "_key": "books/daglib/0073843",
                        "_mdate": "2020-02-12",
                        "author": [
                            {
                                "_VALUE": "Joachim Steinbach"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://kbibmp3.ub.uni-kl.de/Preprint_Informatik/PS/dissertation_1.ps"
                            },
                            {
                                "_VALUE": "https://nbn-resolving.org/urn:nbn:de:bsz:386-kluedo-712"
                            },
                            {
                                "_VALUE": "http://d-nb.info/941908453"
                            },
                            {
                                "_VALUE": "http://d-nb.info/956319327"
                            }
                        ],
                        "pages": ["I-VIII, 1-288"],
                        "school": ["Kaiserslautern University of Technology, Germany"],
                        "title": "Termination of rewriting - extensions, comparison and automatic generation of simplification orderings.",
                        "year": [1994]
                    },
                ],
                sortData: [],
                sortAuthor: [],
                autList: [],
                sortVen: [],
                venList: [],
                sortType: [],
                typeList: [],

            }
        },

        props:['text'],

        watch:{
            text: function () {
                console.log(this.text);
                this.getData();
            }
        },

        methods: {
            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },

            groupBy() {
                this.sortData = this.group_signal(this.publishData, "year");
                console.log(this.sortData)
            },

            sortYear() {
                let yearArr = [];
                for (var i = 0; i < this.publishData.length; i++) {
                    if (yearArr.indexOf((this.publishData[i].year[0])) == -1) {
                        yearArr.push(this.publishData[i].year[0]);
                    }
                }
                this.nowYear = yearArr.sort(function (a, b) {
                    return b - a
                });
            },

            groupByAuthor() {
                let arr = []
                for (let i = 0; i < this.publishData.length; i++) {
                    for (let j = 0; j < this.publishData[i].author.length; j++) {
                        arr.push({name: this.publishData[i].author[j]._VALUE, num: 0});
                    }
                }
                this.sortAuthor = this.group_signal(arr, "name");

                for (let i = 0; i < arr.length; i++) {
                    if (this.autList.indexOf((arr[i].name)) == -1) {
                        this.autList.push(arr[i].name);
                    }
                }
            },

            groupByVen() {
                this.sortVen = this.group_signal(this.publishData, "journal");
                let venArr = [];
                for (var i = 0; i < this.publishData.length; i++) {
                    if (venArr.indexOf((this.publishData[i].journal)) == -1) {
                        venArr.push(this.publishData[i].journal);
                    }
                }
                this.venList = venArr;
            },

            // groupByType() {
            //     this.sortType = this.group_signal(this.publishData, "_publtype");
            //     console.log(this.sortType);
            // },
            searchAuthor(authorName) {
                console.log(authorName);
                this.$emit("searchAuthor", authorName);
            },

            getData(){
                    axios.get("",{
                        params:{
                            msg:this.text
                        }
                    }).then(res =>{
                        this.publishData =res.data;
                        this.sortYear();
                        this.groupBy();
                        this.groupByAuthor();
                        //this.groupByType();
                        this.groupByVen();
                    }).catch(error =>{
                        console.log(error);
                    })
                }


        },
        mounted() {
            this.sortYear();
            this.groupBy();
            this.groupByAuthor();
            this.groupByVen();
            // this.getData();
        }
    }
</script>

<style scoped>
    .pub-list {
        list-style-type: none;
        display: block;
        margin: 0;
    }

    .headline {
        position: relative;
        clear: both;
        background: #606b70;
        color: #ffffff;
        padding: 4px 24px;
        margin: 2ex 0em;
    }
    .hide-head{
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 4ex 0em 2ex 0em;
    }
    .divider{
        border-bottom: 1px whitesmoke solid;
    }
</style>
