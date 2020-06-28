<template>
    <div>
        <div style="padding: 0;min-height: 700px; max-width:1460px;  margin: auto">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'app',
        components: {
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    * {
        margin: 0;
        padding: 0;
    }
</style>
