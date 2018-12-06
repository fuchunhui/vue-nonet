<template>
    <div class="nonet-table">
        <nonet-setting v-bind.sync="common"></nonet-setting>
        <nonet v-bind="common" ui="tiny"></nonet>
    </div>
</template>

<script>
import NonetSetting from './NonetSetting';
import Nonet from '../components/nonet/Nonet.vue';

export default {
    name: 'NonetTable',

    components: {
        Nonet,
        NonetSetting
    },

    props: {

    },

    data() {
        return {
            common: {
                width: 100,
                height: 30,
                columnNum: 10000,
                rowNum: 20000,
                pointer: true,
                thumbnail: false
            }
        }
    },

    methods: {

    }
}
</script>

<style lang="less">
.nonet-table {
    display: flex;
    flex-direction: column;
    .nonet-setting {
        height: 36px;
        padding-left: 20px;
    }
    .nonet {
        flex: 1;
    }
    background-color: #f2f2f2;
}
.nonet1-table {
    ::-webkit-scrollbar {
        height: 10px;
        width: 10px;
        overflow: visible;
    }

    ::-webkit-scrollbar-button {
        height: 0;
        width: 0
    }

    ::-webkit-scrollbar-track {
        background-clip: padding-box;
        border: solid transparent;
        border-width: 0
    }

    ::-webkit-scrollbar-track:hover {
        background-color: rgba(0, 0, 0, 0.05);
        box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.1)
    }

    ::-webkit-scrollbar-track:active {
        background-color: rgba(0, 0, 0, 0.05);
        box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.14),inset -1px 0 0 rgba(0, 0, 0, 0.07)
    }

    ::-webkit-scrollbar-track:horizontal {
        border-width: 0
    }

    ::-webkit-scrollbar-track:horizontal:hover {
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1)
    }

    ::-webkit-scrollbar-track:horizontal:active {
        box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.14), inset 0 -1px 0 rgba(0, 0, 0, 0.07)
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, 0.2);
        min-height: 28px;
        padding: 20px 0 0;
        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1), inset 0 -1px 0 rgba(0, 0, 0, 0.07)
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(0, 0, 0, 0.4);
        box-shadow: inset 1px 1px 1px rgba(0, 0, 0, 0.25)
    }

    ::-webkit-scrollbar-thumb:horizontal {
        border-width: 6px 1px 1px;
        padding: 0 0 0 100px;
        box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1),inset -1px 0 0 rgba(0, 0, 0, 0.07)
    }

    ::-webkit-scrollbar-corner {
        background: transparent
    }
}
</style>
