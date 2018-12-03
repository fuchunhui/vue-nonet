<template>
    <div id="app">
        <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
        <div class="header">
            NonetTable
        </div>
        <nonet-table class="content"></nonet-table>
    </div>
</template>

<script>
import NonetTable from './block/NonetTable';

export default {
    name: 'App',
    components: {
        NonetTable
    }
}
</script>

<style lang="less">
#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    text-align: center;
    color: #2c3e50;
    .header {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        color: grey;
        font-size: 14px;
        text-align: left;
        font-weight: 500;
    }
    .content {
        flex: 1;
    }
}
</style>
