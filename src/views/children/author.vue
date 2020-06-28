<template>
    <el-container>
        <el-header height="60px">
            <h3 class="headline">{{authorName}}</h3>
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
                        <span slot="label">合作者划分</span>
                        <div style="font-size: 13px" v-for="aut in autList" :key="aut" class="divider">
                            <el-button type="text" @click="searchAuthor(aut)" size="small">
                                {{aut}}({{sortAuthor[aut].length}})
                            </el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane >
                        <span slot="label">Veneu划分</span>
                        <div style="font-size: 13px" v-for="ven in venList" :key="ven">
                            {{ven}}({{sortVen[ven].length}})
                        </div>
                    </el-tab-pane>
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">类型划分</span>-->
                    <!--</el-tab-pane>-->
                    <!--<el-tab-pane :disabled=flag>-->
                        <!--<span slot="label">年份划分</span>-->
                        <!--<div style="font-size: 13px" v-for="item in nowYear" :key="item">-->
                            <!--{{item}}({{sortData[item].length}})-->
                        <!--</div>-->
                    <!--</el-tab-pane>-->
                </el-tabs>
            </el-aside>
            <el-main>
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
                    <span v-for="authors in item.author" :key="authors._VALUE" class="name">
                            {{authors._VALUE}}
                            <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                                        v-if="authors._orcid != null">
                                <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                          style="padding-left:0.25em;" alt=""></el-image>
                            </el-tooltip>
                        <span v-if="item.author.indexOf(authors) < item.author.length - 1" class="name">,</span>
                        </span>
                                :<br>
                                <span class="title">{{item.title}}</span>
                                <!--类型划分加链接-->
                                <span class="name">{{item.journal}}</span>
                                <span class="name">{{item.volume}}</span>
                                (<span class="name">{{item.year}}</span>)
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
        name: "author",

        data(){
            return {
                authorName:'',
                nowYear: [],
                articleData: [
                    {
                        "_id": {"$oid": "5eedea99310f336f41bf5e86"},
                        "_key": "journals/corr/abs-1806-03693",
                        "_mdate": "2018-08-13",
                        "_publtype": "informal",
                        "author": [
                            {
                                "_VALUE": "Tshilidzi Marwala"
                            },
                            {
                                "_VALUE": "Umar Ruhi"
                            },
                            {
                                "_VALUE": "Rubina Lakhani"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://arxiv.org/abs/1806.03693",
                                "_type": "oa"
                            }
                        ],
                        "journal": "CoRR",
                        "title": {
                            "_VALUE": "Conceptualizing Blockchains: Characteristics & Applications."
                        },
                        "url": "db/journals/corr/corr1806.html#abs-1806-03693",
                        "volume": "abs/1806.03693",
                        "year": 2018
                    },
                    {
                        "_id": {"$oid": "5eedea99310f336f41bf5e86"},
                        "_key": "journals/corr/abs-1806-03693",
                        "_mdate": "2018-08-13",
                        "_publtype": "informal",
                        "author": [
                            {
                                "_VALUE": "Karim Sultan"
                            },
                            {
                                "_VALUE": "Tshilidzi Marwala"
                            },
                            {
                                "_VALUE": "Rubina Lakhani"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://arxiv.org/abs/1806.03693",
                                "_type": "oa"
                            }
                        ],
                        "journal": "CoRR",
                        "title": {
                            "_VALUE": "Conceptualizing Blockchains: Characteristics & Applications."
                        },
                        "url": "db/journals/corr/corr1806.html#abs-1806-03693",
                        "volume": "abs/1806.03693",
                        "year": 2018
                    }, {
                        "_id": {"$oid": "5eedea9a310f336f41bf7085"},
                        "_key": "journals/bmcbi/PfeiferLHK07",
                        "_mdate": "2020-03-15",
                        "author": [
                            {
                                "_VALUE": "Tshilidzi Marwala",
                            },
                            {
                                "_VALUE": "Andreas Leinenbach"
                            },
                            {
                                "_VALUE": "Christian G. Huber",
                                "_orcid": "0000-0001-8358-1880"
                            },
                            {
                                "_VALUE": "Oliver Kohlbacher",
                                "_orcid": "0000-0003-1739-4598"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "https://doi.org/10.1186/1471-2105-8-468",
                                "_type": "oa"
                            },
                            {
                                "_VALUE": "https://www.wikidata.org/entity/Q33308294"
                            }
                        ],
                        "journal": "BMC Bioinform.",
                        "title": {
                            "_VALUE": "Statistical learning of peptide retention behavior in chromatographic separations: a new kernel-based approach for computational proteomics."
                        },
                        "url": "db/journals/bmcbi/bmcbi8.html#PfeiferLHK07",
                        "volume": "8",
                        "year": 2007
                    },
                ],
                sortData: [],
                sortAuthor: [],
                autList: [],
                sortVen: [],
                venList: [],
                sortType: [],
                typeList: [],
                name:"",
            }
        },

        props:['text'],

        methods:{
            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },

            groupBy() {
                this.sortData = this.group_signal(this.articleData, "year");
            },

            sortYear() {
                let yearArr = [];
                for (var i = 0; i < this.articleData.length; i++) {
                    if (yearArr.indexOf((this.articleData[i].year)) == -1) {
                        yearArr.push(this.articleData[i].year);
                    }
                }
                this.nowYear = yearArr.sort(function (a, b) {
                    return b - a
                });
            },

            groupByAuthor() {
                let arr = []
                for (let i = 0; i < this.articleData.length; i++) {
                    for (let j = 0; j < this.articleData[i].author.length; j++) {
                        arr.push({name: this.articleData[i].author[j]._VALUE, num: 0});
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
                this.sortVen = this.group_signal(this.articleData, "journal");
                let venArr = [];
                for (var i = 0; i < this.articleData.length; i++) {
                    if (venArr.indexOf((this.articleData[i].journal)) == -1) {
                        venArr.push(this.articleData[i].journal);
                    }
                }
                this.venList = venArr;
            },

            searchAuthor(authorName) {
                console.log(authorName);
                this.$emit("searchAuthor", authorName);
            },

            cleanAll(){
                this.sortData.splice(0,this.sortData.length);
                this.sortAuthor=null;
                this.autList.splice(0,this.autList.length);
                this.venList.splice(0,this.venList.length);
                this.sortVen.splice(0,this.sortVen.length);
                this.nowYear.splice(0,this.nowYear.length);
            },

            getData(){
                axios.get("",{
                    params:{
                        msg:this.text
                    }
                }).then(res =>{
                    this.cleanAll();
                    this.articleData =res.data;
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
            this.authorName = this.text;
            this.sortYear();
            this.groupBy();
            this.groupByAuthor();
            // this.groupByType();
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
    .divider{
        border-bottom: 1px whitesmoke solid;
    }
    .title{
        color: #666666;
        font-weight: 700;
    }
    .name{
        color: #7d848a;
    }
</style>
