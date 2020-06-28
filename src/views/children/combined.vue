<template>
    <el-container>
        <el-header height="60px">
            <h3 class="headline">Search &nbsp; For &nbsp; Combined</h3>
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
                    <el-tab-pane>
                        <span slot="label">作者划分</span>
                        <div style="font-size: 13px" v-for="aut in autList" :key="aut" class="divider">
                            <el-button type="text" @click="searchAuthor(aut)" size="small">
                                {{aut}}({{sortAuthor[aut].length}})
                            </el-button>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane>
                        <span slot="label">Veneu划分</span>
                        <div style="font-size: 13px; " v-for="ven in venList" :key="ven">
                            {{ven}}({{sortVen[ven].length}})
                        </div>
                    </el-tab-pane>
                    <!--<el-tab-pane :disabled=flag>-->
                    <!--<span slot="label">类型划分</span>-->
                    <!--</el-tab-pane>-->
                    <el-tab-pane>
                        <span slot="label">年份划分</span>
                        <div style="font-size: 13px" v-for="years in nowYear" :key="years">
                            {{years}}({{sortData[years].length}})
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-aside>
            <el-main  v-loading="loading">
                <el-col>
                    <ul class="pub-list" v-for="year in nowYear " :key="year._VALUE">
                        <li>{{year}}</li>
                        <br>
                        <li v-for="item in sortData[year]" :key="item._VALUE"
                            style="display: inline;padding: 20px; width: 80%;margin: auto">
                            <el-link :href=item.ee[0]._VALUE style="padding-right: 20px" :underline="false"
                                     v-if="item.ee[0]._VALUE != null">
                                <el-button circle icon="el-icon-document" size="mini"></el-button>
                            </el-link>
                            <el-tooltip v-else content="sorry,无链接" placement="bottom-end">
                                <el-button circle icon="el-icon-document" size="mini" disabled
                                           style="margin-right: 20px"></el-button>
                            </el-tooltip>
                            <cite style="display: table-cell; font: inherit; padding: 0 2px; max-width: 800px">
                    <span v-for="authors in item.author" :key="authors._VALUE" class="name">
                            {{authors._VALUE}}
                            <el-tooltip class="item" effect="dark" :content=authors._orcid placement="bottom-end"
                                        v-if="authors._orcid != null">
                                <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                          style="padding-left:0.25em;"></el-image>
                            </el-tooltip>
                        <span v-if="item.author.indexOf(authors) < item.author.length - 1">,</span>
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
        name: "combined",
        data() {
            return {
                nowYear: [],
                articleData: [
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
                                "_VALUE": "Umar Ruhi"
                            },
                            {
                                "_VALUE": "Rubina Lakhani"
                            }
                        ],
                        "ee": [
                            {
                                // "_VALUE": "",
                                "_type": "oa"
                            }
                        ],
                        "journal": "CoRR",
                        "title": "Conceptualizing Blockchains: Characteristics & Applications.",
                        "url": "db/journals/corr/corr1806.html#abs-1806-03693",
                        "volume": "abs/1806.03693",
                        "year": 2018
                    },
                    {
                        "_id": {"$oid": "5eedea99310f336f41bf5e87"},
                        "_key": "journals/corr/RossiFF13",
                        "_mdate": "2018-08-13",
                        "_publtype": "informal",
                        "author": [
                            {
                                "_VALUE": "Wilbert Samuel Rossi"
                            },
                            {
                                "_VALUE": "Paolo Frasca"
                            },
                            {
                                "_VALUE": "Fabio Fagnani"
                            }
                        ],
                        "ee": [
                            {
                                "_VALUE": "http://arxiv.org/abs/1309.2172",
                                "_type": "oa"
                            }
                        ],
                        "journal": "CoRR",
                        "title": {
                            "_VALUE": "Effective resistance of toroidal graphs; some sharper results and applications."
                        },
                        "url": "db/journals/corr/corr1309.html#RossiFF13",
                        "volume": "abs/1309.2172",
                        "year": 2013
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
                        "_id": {"$oid": "5eedea9a310f336f41bf7085"},
                        "_key": "journals/bmcbi/PfeiferLHK07",
                        "_mdate": "2020-03-15",
                        "author": [
                            {
                                "_VALUE": "Nico Pfeifer",
                                "_orcid": "0000-0002-4647-8566"
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

                title_get: "",
                author_get: [],
                year_get: [],

                loading:false,
            }
        },

        watch: {
            text: function () {
                this.text_split();
                this.getData();
            }
        },

        props: ['text'],
        methods: {
            group_signal(data, key) {
                return data.reduce(function (prev, cur) {
                    (prev[cur[key]] = prev[cur[key]] || []).push(cur);
                    return prev;
                }, {});
            },

            groupBy() {
                if (this.sortData.length > 0) {
                    this.sortData.splice(0, this.sortData);
                }
                this.sortData = this.group_signal(this.articleData, "year");
                // console.log(this.articleData.length);
            },

            sortYear() {
                if (this.nowYear.length > 0) {
                    this.nowYear.splice(0, this.nowYear.length);
                }
                let yearArr = [];
                let length = this.articleData.length;
                for (let i = 0; i < length; i++) {
                    if (yearArr.indexOf(this.articleData[i].year) == -1) {
                        yearArr.push(this.articleData[i].year);
                    }
                }
                // let yearsArr= [];
                // yearArr = yearArr.sort(function (a, b) {
                //     return b - a;
                // });
                // for(let i =0; i<yearArr.length;i++){
                //     yearsArr.push({value: yearArr[i], len: this.sortData[yearArr[i]].length});
                // }
                // console.log(this.sortData);
                // this.nowYear = yearsArr;
                // console.log(this.nowYear)
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
                if (this.sortAuthor.length > 0) {
                    this.sortAuthor = null;
                }
                this.sortAuthor = this.group_signal(arr, "name");


                if (this.autList.length > 0) {
                    this.autList.splice(0, this.autList.length);
                }
                for (let i = 0; i < arr.length; i++) {
                    if (this.autList.indexOf((arr[i].name)) == -1) {
                        this.autList.push(arr[i].name);
                    }
                }
            },

            groupByVen() {
                if (this.sortVen.length > 0) {
                    this.sortVen.splice(0, this.sortVen.length);
                }
                this.sortVen = this.group_signal(this.articleData, "journal");
                let venArr = [];
                for (var i = 0; i < this.articleData.length; i++) {
                    if (venArr.indexOf((this.articleData[i].journal)) == -1) {
                        venArr.push(this.articleData[i].journal);
                    }
                }
                if (this.venList.length > 0) {
                    this.venList.splice(0, this.venList.length);
                }
                this.venList = venArr;
            },

            // groupByType() {
            //     this.sortType = this.group_signal(this.articleData, "_publtype");
            //     console.log(this.sortType);
            // },

            cleanAll() {
                this.sortData.splice(0, this.sortData.length);
                this.sortAuthor = null;
                this.autList.splice(0, this.autList.length);
                this.venList.splice(0, this.venList.length);
                this.sortVen.splice(0, this.sortVen.length);
                this.nowYear.splice(0, this.nowYear.length);
            },

            getData() {
                /*
                * title_get: "",
                author_get: [],
                year_get: [],*/
                console.log(this.author_get)
                axios.post("http://localhost:8080/article/search",
                    {
                        title: this.title_get,
                        author: this.author_get,
                        year: this.year_get,
                        msg: this.text
                    },
                ).then(res => {
                    // this.cleanAll();
                    this.articleData = res.data;
                    this.groupBy();
                    this.sortYear();

                    this.groupByAuthor();
                    // this.groupByType();
                    this.groupByVen();
                })
                /*  axios.get("", {
                      params: {
                          label: 0,

                      }
                  })*/
                this.loading = false;
            },

            searchAuthor(authorName) {
                // console.log(authorName);
                this.$emit("searchAuthor", authorName);
            },

            text_split() {
                let list = this.text.split("&");
                for (let i = 0; i < list.length; i++) {
                    // newlist.push(list[i].split(":"));
                    list[i] = list[i].split(":");
                }

                this.author_get.splice(0, this.author_get.length);
                this.title_get = null;
                this.year_get.splice(0, this.year_get.length);

                for (let i = 0; i < list.length; i++) {
                    switch (list[i][0]) {
                        case "title": {
                            if (list[i].length > 2) {
                                console.log("文章名违规")
                                break;
                            }
                            this.title_get = list[i][1];
                            break;
                        }
                        case "year": {
                            let yearList = list[i][1].split("..");
                            if (yearList.length > 1) {
                                let starYear = Math.min(yearList[0], yearList[1]);
                                let endYear = Math.max(yearList[0], yearList[1]);
                                for (let j = starYear; j <= endYear; j++) {
                                    this.year_get.push(j.toString());
                                }
                                // console.log(this.year_get);
                                break;
                            } else {
                                this.year_get.push(list[i][1]);
                            }
                            break;
                        }

                        case "author": {
                            this.author_get = list[i][1].split(",");
                            break;
                        }

                    }
                }

                this.loading = true;
                // console.log(this.title_get);
                // console.log(this.year_get);
                // console.log(this.author_get);
            },


        },
        mounted() {
            this.text_split();
            // this.groupBy();
            // this.sortYear();
            // this.groupByAuthor();
            // this.groupByVen();
            this.getData();

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

    .divider {
        border-bottom: 1px whitesmoke solid;
    }

    .title {
        color: #666666;
        font-weight: 700;
    }

    .name {
        color: #7d848a;
    }
</style>
