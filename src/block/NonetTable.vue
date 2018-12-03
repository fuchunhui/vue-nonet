<template>
    <div class="nonet-table">
        <nonet-setting v-bind.sync="common"></nonet-setting>
        <nonet ui="tiny"></nonet>
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
                width: 1020,
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
        height: 40px;
        padding-left: 20px;
    }
    .nonet {
        flex: 1;
    }
    background-color: #f2f2f2;
}
</style>
