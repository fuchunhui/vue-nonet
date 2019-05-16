<template>
    <div id="app">
        <veui-tabs :active.sync="current">
            <veui-tab label="表格" name="TABLE"></veui-tab>
            <veui-tab label="颜色" name="COLOR"></veui-tab>
            <veui-tab label="鲜花" name="FLOWER"></veui-tab>
            <veui-tab label="多维表" name="SCROLL"></veui-tab>
        </veui-tabs>
        <div class="header">
            {{ titleName }}
        </div>
        <component class="content-nonet" v-bind:is="nonetComponent"/>
    </div>
</template>

<script>
import NonetColor from './block/NonetColor';
import NonetFlower from './block/NonetFlower';
import NonetScroll from './block/NonetScroll';
import NonetTable from './block/NonetTable';

export default {
    name: 'App',

    components: {
        NonetColor,
        NonetFlower,
        NonetTable,
        NonetScroll
    },
    
    data() {
        return {
            current: 'TABLE'
        }
    },

    computed: {
        nonetComponent() {
            let component = {
                'COLOR': NonetColor,
                'FLOWER': NonetFlower,
                'SCROLL': NonetScroll,
                'TABLE': NonetTable
            };
            return component[this.current];
        },
        titleName() {
            let component = {
                'COLOR': 'NonetColor',
                'FLOWER': 'NonetFlower',
                'SCROLL': 'NonetScroll',
                'TABLE': 'NonetTable'
            };
            return component[this.current];
        }
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
    .veui-tabs {
        flex: 0 0 auto;
        height: 40px;
        font-size: 14px;
    }
    .header {
        height: 30px;
        line-height: 30px;
        padding-left: 20px;
        color: grey;
        font-size: 14px;
        text-align: left;
        font-weight: 500;
    }
    .content-nonet {
        flex: 1;
    }
}
</style>
