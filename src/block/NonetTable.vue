<template>
    <div class="nonet-table">
        <nonet-setting v-bind.sync="common" :thumbnail.sync="thumbnail"/>
        <nonet
            v-bind="common"
            :list="nonetList"
            :reset.sync="reset"
            :scrollTop.sync="scrollTop"
            :scrollLeft.sync="scrollLeft"
            @viewChange="viewChange"
            @nonetChange="nonetChange">
        </nonet>
        <template v-if="thumbnail">
            <thumbnail
                class="nonet-table-thumbnail"
                :view="view"
                :nonet="nonet"
                :total="{
                    col: common.columnNum,
                    row: common.rowNum
                }">
            </thumbnail>
        </template>
    </div>
</template>

<script>
import NonetSetting from './NonetSetting';
import Nonet from '../components/nonet/Nonet.vue';
import Thumbnail from '../components/nonet/Thumbnail.vue';

export default {
    name: 'NonetTable',

    components: {
        Nonet,
        Thumbnail,
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
                pointer: true
            },
            thumbnail: true,
            reset: false,
            scrollTop: 0,
            scrollLeft: 0,
            view: {
                x: 0,
                y: 0,
                col: 0,
                row: 0
            },
            nonet: {
                x: 0,
                y: 0,
                col: 0,
                row: 0
            },
            list: []
        }
    },

    computed: {
        nonetList() {
            let list = [];
            this.list.forEach(() => {
                list.push({
                    value: Math.floor(Math.random() * 100)
                });
            });
            return list;
        }
    },

    methods: {
        viewChange(view) {
            this.view = view;
        },
        nonetChange({nonet, stage}) {
            this.nonet = nonet;
            this.getNonetData(stage);
        },
        getNonetData(stage) {
            switch(stage) {
                case 'INIT':
                    this.resetData();
                    break;
                case 'RESET':
                    this.getData();
                    break;
                case 'UPDATE':
                    break;
                default:
                    if (this.list.length) {
                        this.getData();
                    }
                    break;
            }
        },
        resetData() {
            this.reset = true;
            this.list = [];
        },
        getData() {
            setTimeout(() => {
                let {col, row} = this.nonet;
                let rankList = new Array(col * row);
                this.list = rankList.fill('1');
            }, 100);
        }
    }
}
</script>

<style lang="less">
.nonet-table {
    display: flex;
    flex-direction: column;
    background-color: #f2f2f2;
    .nonet-setting {
        height: 36px;
        padding-left: 20px;
    }
    .nonet {
        width: unset;
        flex: 1;
        background-color: #FFFFFF;
        border: 1px solid rgb(75, 89, 167);
        margin: 5px 10px 10px;
    }
    &-thumbnail {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
