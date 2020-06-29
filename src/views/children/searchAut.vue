<template>
    <el-container>
        <el-alert v-if="checkBox" style="width: 400px; margin: auto"
                  title="输入为空，请重新输入" center closable
                  show-icon type="warning">
        </el-alert>
        <el-header height="60px">
            <h3 class="headline">Search &nbsp; For &nbsp; Authors</h3>
        </el-header>
        <el-main>
            <header class="hide-head">
                <h2>Author search results</h2>
            </header>
            <ul class="pub-list" v-if="lucklyList.length > 0">
                <p>幸运匹配</p>
                <li v-for="luckly in lucklyList" :key="luckly._VALUE">
                    <el-button type="text" @click="searchAuthor(luckly._VALUE)" size="mini">
                        {{luckly._VALUE}}
                        <el-tooltip class="item" effect="dark" :content=luckly._orcid placement="bottom-end"
                                    v-if="luckly._orcid != null">
                            <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                      style="padding-left:0.25em;" alt=""></el-image>
                        </el-tooltip>
                    </el-button>
                </li>
            </ul>
            <ul class="pub-list">
                <p>所有{{authList.length}}条匹配</p>
                <li v-for="item in authList" :key="item._VALUE">
                    <el-button type="text" @click="searchAuthor(item._VALUE)" size="mini">
                        {{item._VALUE}}
                        <el-tooltip class="item" effect="dark" :content=item._orcid placement="bottom-end"
                                    v-if="item._orcid != null">
                            <el-image src="https://dblp2.uni-trier.de/img/orcid-mark.12x12.png"
                                      style="padding-left:0.25em;" alt=""></el-image>
                        </el-tooltip>
                    </el-button>
                </li>
            </ul>
        </el-main>
    </el-container>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "searchAut",

        data() {
            return {
                authorName: "",
                authList: [
                    {
                        _VALUE: "",
                        _orcid: "",
                        _aux: "",
                    },
                ],
                lucklyList: [],
                checkBox: false,
            }
        },

        props: ['text'],
        methods: {

            searchAuthor(name) {
                this.authorName = name;
                this.$emit("searchAuthor", this.authorName);
            },

            getLuckly() {
                let list = [];
                let length = this.authList.length;
                for (let i = 0; i < 6; i++) {
                    let num = Math.floor(Math.random() * length);
                    if (list.indexOf(this.authList[num]) == -1) {
                        list.push(this.authList[num]);
                    }
                }
                this.lucklyList = list;
                // console.log(this.lucklyList);
            },

            more() {
              /*  let list = [];
                for (let i = 0; i < 30; i++) {
                    let num = Math.random() * 2;
                    num = Math.floor(num);
                    list.push({
                        _VALUE: this.authList[num]._VALUE + i,
                        _orcid: this.authList[num]._orcid,
                        _aux: this.authList[num]._aux
                    });
                }*/
                // this.authList = list;
                this.lucklyList.splice(0,this.lucklyList.length);
                if (this.authList.length >= 20) {
                    this.getLuckly();
                }
                // console.log(this.authList);
            },

            getData() {
                axios.get("http://192.168.3.5:8080/authors", {
                    params: {
                        _VALUE: this.text
                    }
                }).then(res => {
                    console.log(res.data)
                    this.authList = res.data;
                    this.more();
                }).catch(error => {
                    console.log(error);
                })
            },

            checkbox() {
                if (this.text == '') {
                    this.checkBox = true;
                } else {
                    this.getData();
                    this.more();
                }
            }

        },

        watch:{
            text: function () {
                console.log(this.text);
                this.getData();
            }
        },

        mounted() {
            this.checkbox();
        }
    }
</script>

<style scoped>
    .headline {
        position: relative;
        clear: both;
        background: #606b70;
        color: #ffffff;
        padding: 4px 24px;
        margin: 2ex 0em;
    }

    .pub-list {
        /*list-style-type: none;*/
        display: block;
        margin: 0;
        font-size: 15px;
    }

    .hide-head {
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 4ex 0em 2ex 0em;
    }
</style>
