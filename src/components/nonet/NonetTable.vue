<template>
    <div class="nonet">
        <p>这是一段测试文字</p>
        <veui-input ui="tiny"></veui-input>
    </div>
</template>

<script>
export default {
    name: 'NonetTable',

    props: {

    },

    data() {
        return {

        }
    },

    methods: {

    }
}
</script>

<style lang="less">
@import url('../../assets/css/variables');
.nonet {
    width: 100%;
    height: 400px;
    background-color: #f2f2f2;

    p {
        color: @nonet-test;
    }
}
</style>
