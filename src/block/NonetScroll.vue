<template>
    <div
        ref="nonetScroll"
        class="nonet-scroll"
        v-veui-resize="resize">
        <div
            ref="nonetScrollTable"
            :style="{maxWidth: `${width + rowWidth}px`}"
            :class="['nonet-scroll-table', {'nonet-scroll-table-border': rowWidth}]">
            <div class="nonet-title">
                <div
                    :style="{marginLeft: `${rowWidth - 1}px`}"
                    class="nonet-columns">
                    <div
                        ref="nonetColumn"
                        :style="{width: `${width}px`}"
                        class="column-layout">
                        <div :style="{
                            width: nonet.x * cellWidth + 'px'
                        }"/>
                        <div
                            v-for="(item, index) in columnList"
                            :key="index"
                            :style="{
                                width: `${cellWidth}px`,
                                height: `${item.height}px`,
                                lineHeight: `${item.height}px`
                            }"
                            class="column-layout-cell">
                            {{ item.value }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                :style="{
                    top: `${colHeight - 1}px`,
                    bottom: `${0}px`,
                    paddingLeft: `${rowWidth - 1}px`,
                    maxHeight: `${height + 2}px`
                }"
                class="nonet-wrap">
                <div
                    :style="{width: `${rowWidth}px`}"
                    class="nonet-rows-wrapper">
                    <div
                        v-scroll="onRowScroll"
                        ref="nonetRow"
                        :style="{width: `${rowWidth + 20}px`}"
                        class="nonet-rows">
                        <div :style="{
                            position: 'relative',
                            height: `${height}px`
                        }">
                            <div
                                :style="{
                                    position: 'absolute',
                                    width: `${rowWidth}px`,
                                    top: `${nonet.y * cellHeight}px`
                            }">
                                <div
                                    v-for="(item, index) in rowList"
                                    :key="index"
                                    :style="{
                                        width: `${item.width}px`,
                                        height: `${cellHeight}px`,
                                        lineHeight: `${cellHeight}px`
                                    }"
                                    class="nonet-rows-cell">
                                    {{ item.value }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nonet
                    class="nonet-chart-view"
                    :width="cellWidth"
                    :height="cellHeight"
                    :columnNum="colCount"
                    :rowNum="rowCount"
                    :list="list"
                    :reset.sync="reset"
                    :scrollTop.sync="scrollTop"
                    :scrollLeft.sync="scrollLeft"
                    @nonetChange="nonetChange"
                    :target="$refs.nonetScroll">
                    <div
                        v-for="(item, index) in list"
                        :key="index | realKey(nonet)"
                        :style="{
                            width: `${cellWidth}px`,
                            height: `${cellHeight}px`,
                            lineHeight: `${cellHeight}px`
                        }"
                        class="nonet-grid-cell">
                        <span :title="item.value">
                            {{ item.value }}
                        </span>
                    </div>
                </nonet>
            </div>
        </div>
    </div>
</template>

<script>
import Nonet from '../components/nonet/Nonet.vue';

export default {
    name: 'NonetScroll',

    components: {
        Nonet
    },

    filters: {
        realKey(value, nonet) {
            let {x, y, col} = nonet;
            if (col === 0) {
                return `key${value}`;
            }
            let xc = value % col;
            let realX = x + xc + 1;
            let realY = y + (value - xc) / col + 1;
            return `${realX}, ${realY}`;
        },
        bothValue(value, realValue) {
            return `${value} (${realValue})`;
        }
    },

    data() {
        return {
            cellWidth: 100,
            cellHeight: 30,
            colCount: 1000,
            rowCount: 1000,
            reset: false,
            scrollTop: 0,
            scrollLeft: 0,
            nonet: {
                x: 0,
                y: 0,
                col: 0,
                row: 0
            },
            fixedHeight: 32,
            viewList: [],
            stage: ''
        };
    },

    computed: {
        list() {
            let list = [];
            this.viewList.forEach(() => {
                list.push({
                    value: Math.floor(Math.random(100) * 100),
                    backgroundColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
                });
            });
            return list;
        },
        columnList() {
            let list = new Array(this.nonet.col).fill('0');
            list = list.map(() => {
                return {
                    value: Math.random().toString(36).substr(8).toUpperCase(),
                    width: this.cellWidth,
                    height: 40
                };
            });
            return list;
        },
        rowList() {
            let {y, row} = this.nonet;
            let list = new Array(row).fill('0');
            list = list.map((item, index) => {
                return {
                    value: index + 1 + y,
                    width: 80,
                    height: this.cellHeight
                };
            });
            return list;
        },
        width() {
            return this.cellWidth * this.colCount;
        },
        height() {
            return this.cellHeight * this.rowCount;
        },
        rowWidth() {
            return this.rowList.length ? this.rowList[0].width : 0;
        },
        colHeight() {
            return this.columnList.length ? this.columnList[0].height : 0;
        }
    },

    watch: {
        scrollTop(val) {
            this.$nextTick(() => {
                this.$refs.nonetRow.scrollTop = val;
            });
        },
        scrollLeft(val) {
            this.$refs.nonetColumn.style.left = `-${val}px`;
        }
    },

    methods: {
        resize() {
            // ...
        },
        onRowScroll(event, options) {
            this.scrollTop = options.scrollTop;
        },
        nonetChange({nonet, stage}) {
            this.nonet = nonet;
            this.stageChange(stage);
            this.viewList = new Array(nonet.col * nonet.row).fill('1');
        },
        stageChange(stage) {
            // do something
            this.stage = stage;
        },
        resetNonet() {
            this.reset = true;
        }
    }
};
</script>

<style lang="less">
@import url('../assets/css/scrollbar.less');
.nonet-scroll {
    width: calc(100% - 20px);
    height: calc(100% - 10px);
    position: relative;
    margin-top: 5px;
    margin-left: 10px;
    background-color: #FFFFFF;
}
.nonet-scroll-table {
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    border-top: 1px solid transparent;
    &-border {
        border-color: #DDDEE4;
    }

    .nonet-wrap {
        position: absolute;
        right: 0;
        left: 0;
        border-left: 1px solid #DDDEE4;
        border-right: 1px solid #DDDEE4;
        z-index: 1;
    }

    .nonet-chart-view {
        background-color: transparent;
        .nonet-grid {
            border-right: none;
        }
    }

    .nonet-title {
        position: relative;
        top: -1px;
        background-color: transparent;
        border-left: 1px solid #DDDEE4;
        border-right: 1px solid #DDDEE4;
    }

    .nonet-columns {
        overflow: hidden;
        position: relative;
        background: transparent;
        border-left: 1px solid #DDDEE4;
        z-index: 3;
        .column-layout {
            position: relative;
            display: flex;
            &-cell {
                border-right: 1px solid #DDDEE4;
                font-size: 12px;
                color: #666666;
                text-align: center;
            }
        }
    }

    .nonet-rows-wrapper {
        height: 100%;
        position: absolute;
        left: 0;
        border-right: 1px solid #DDDEE4;
        overflow: hidden;
        z-index: 1;
    }
    .nonet-rows {
        position: absolute;
        left: 0;
        overflow-y: scroll;
        background: transparent;
        border-top: 1px solid #DDDEE4;
        height: 100%;
        &-cell {
            border-bottom: 1px solid #DDDEE4;
            border-right: 1px solid #DDDEE4;
            font-size: 12px;
            color: #666666;
            text-align: center;
        }
    }
}
</style>
