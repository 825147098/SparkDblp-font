<template>
    <el-container>
        <el-header height="60px">
            <h3 class="headline">Search &nbsp; For &nbsp; Combined</h3>
        </el-header>
        <el-main>
            <header class="hide-head">
                <h2>Author search results</h2>
            </header>
            <ul class="pub-list">
                <p>幸运匹配</p><br>
                <el-button type="text" @click="searchAuthor"><li >sdfsdf</li></el-button>
            </ul>
            <ul class="pub-list">
                <p>所有条匹配</p><br>
                <li></li>
            </ul>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "searchAut",

        data(){
            return{
                authorName:"aedf",
            }
        },

        methods:{

            searchAuthor() {
                this.$emit("searchAuthor", this.authorName);
            }
        },

        mounted() {

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

    .hide-head{
        border-bottom: 2px #7d848a solid;
        min-height: 27px;
        padding: 0px 16px 0px 24px;
        margin: 4ex 0em 2ex 0em;
    }
</style>
