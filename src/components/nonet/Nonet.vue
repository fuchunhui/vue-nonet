<!--
九宫格算法设计实现：

基准：
基于模型（行列上的维度和指标）保持不变的前提下，如下的内容生效，如果模型发生变化，需要重置所有的参数。

三个术语：
1.坐标点，左上角为(0,0)，右下角为(columnNum，rowNum)。
2.坐标单元，行与列交叉得到的最小格子。
3.坐标单位，长度值与属性长度值的除数值，或者宽度除数值。

设计思路：
1.把整个结果显示区域分为三部分，可视区域，九宫格区域，数据区。
2.可视区域，用于显示。
3.九宫格区域，处理数据的计算渲染。九宫格分为九个宫，每个宫区域大小相等，单独的宫的大小一定是大于可视区域的。
4.数据区，行列数据的最大渲染区域。

滚动条触发：
1.计算可视区域的新起点；
2.判断是否触发边界检测规则；
3.如果超出边界，获取新的九宫格起点坐标，发起数据获取请求；
4.重新渲染可视区域。

可视区域大小改变，触发流程：
1.计算新的可视区域长度和宽度；
2.检测是否触发边界检测规则；
3.如果触发规则，计算新的九宫格坐标，新的九宫格大小，发起新的数据请求；
4.重新渲染可视区域。

不改变滚动条位置的操作如下：
1.全屏和退出全屏
2.手动改变浏览器大小
3.坐标单元width/height变化
-->

<template>
    <div ref="nonet" class="nonet">
        <scroll-bar
            ref="nonetData"
            v-veui-resize="resize"
            v-scroll="onDataScroll"
            class="nonet-view">
            <div
                :style="{
                    width: `${totalWidth}px`,
                    height: `${totalHeight}px`
                }"
                class="nonet-layout"/>
            <data-grid
                :nonet="nonet"
                :width="width"
                :height="height"
                :pointer="pointer"
                :list="rankList"
                :style="{
                    width: nonetCols * width + 1 + 'px',
                    height: nonetRows * height + 'px',
                    top: nonetY * height + 'px',
                    left: nonetX * width + 'px',
                    maxWidth: totalWidth + 1 + 'px',
                    maxHeight: totalHeight + 'px'
            }"/>
        </scroll-bar>
        <template v-if="thumbnail">
            <thumbnail
                class="nonet-thumbnail"
                :view="view"
                :nonet="nonet"
                :total="{
                    col: columnNum,
                    row: rowNum
                }">
            </thumbnail>
        </template>
    </div>
</template>

<script>
import DataGrid from './DataGrid';
import Thumbnail from './Thumbnail';
import ScrollBar from '../../toolkits/ScrollBar';

let dataTimer;
let resizeTimer;

export default {
    name: 'Nonet',
    components: {
        DataGrid,
        ScrollBar,
        Thumbnail
    },
    props: {
        width: {
            type: Number,
            default: 0,
            required: true
        },
        height: {
            type: Number,
            default: 0,
            required: true
        },
        columnNum: {
            type: Number,
            default: 0,
            required: true
        },
        rowNum: {
            type: Number,
            default: 0,
            required: true
        },
        pointer: {
            type: Boolean,
            default: true
        },
        thumbnail: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            x: 0,                   // 起点横轴坐标
            y: 0,                   // 起点纵轴坐标
            xCols: 0,               // 可视区域，显示的列数
            yRows: 0,               // 可视区域，显示的行数
            nonetX: 0,              // 九宫格起点横坐标
            nonetY: 0,              // 九宫格起点纵坐标
            nonetCols: 0,           // 九宫格列数，与width的积，即为九宫格的长度。
            nonetRows: 0,           // 九宫格行数，与height的积，即为九宫格的宽度
            isScrolling: false,
            resetNonet: false,
            resetScroll: true,
            rankList: []
        };
    },
    computed: {
        totalWidth() {
            return this.width * this.columnNum;
        },
        totalHeight() {
            return this.height * this.rowNum;
        },
        nonet() {
            return {
                x: this.nonetX,
                y: this.nonetY,
                col: this.nonetCols,
                row: this.nonetRows
            };
        },
        view() {
            return {
                x: this.x,
                y: this.y,
                col: this.xCols,
                row: this.yRows
            };
        }
    },
    methods: {
        onDataScroll(event, options) {
            this.relocationPointer(options);
        },
        /**
         * 计算九宫格的一个宫包含的坐标单元数
         * @param  {[Number]} num [可视区域坐标单元数]
         * @return {[Number]}     [一个宫包含的坐标单元数]
         *
         * TODO 优化点：考虑至少每个宫20起，九宫就是60。
         */
        unitNonetCount(num) {
            return Math.ceil(num / 10) * 10;
        },
        /**
         * 计算九宫格横向或者纵向的坐标格子数
         * @param  {[Number]} count     [可视区域坐标格子数]
         * @param  {[Number]} rankCount [nonet最大的行数或者列数]
         * @return {[Number]}           [横向或者纵向的坐标格子数]
         */
        computeNonetCount(count, rankCount) {
            return Math.min(this.unitNonetCount(count) * 3, rankCount);
        },
        /**
         * 计算nonet的起点坐标位置
         * @param  {[Number]} scrollPoint [可视区坐标点]
         * @param  {[Number]} nonetCount  [九宫格包含的坐标单元数]
         * @param  {[Number]} rankCount   [nonet最大的行数或者列数]
         * @return {[Number]}             [新的坐标位置]
         *
         * 优化点： 当前的坐标在左上角的宫内，也可以在中间，坐标就再减去一个三分之一
         * 可变算法，持续优化。
         * 计算滚动条的变化趋势，计算合适的起点坐标。
         */
        computeNonetPointValue(scrollPoint, nonetCount, rankCount) {
            let pointer = scrollPoint - (scrollPoint % (nonetCount / 3));
            let result = Math.min(Math.max(pointer, 0), rankCount - nonetCount);
            return result;
        },
        /**
         * 可视区域的行数列数
         */
        computeRanks(node) {
            this.xCols = Math.ceil(node.clientWidth / this.width);
            this.yRows = Math.ceil(node.clientHeight / this.height);
            // console.log('this.xCols：', this.xCols);
            // console.log('this.yRows：', this.yRows);
        },
        computeNonetRanks(rankCols, rankRows) {
            this.nonetCols = this.computeNonetCount(this.xCols, rankCols || this.columnNum);
            this.nonetRows = this.computeNonetCount(this.yRows, rankRows || this.rowNum);
            // console.log('this.nonetCols: ', this.nonetCols);
            // console.log('this.nonetRows: ', this.nonetRows);
        },
        checkNonetRanks() {
            this.nonetCols = Math.min(this.nonetCols, this.columnNum);
            this.nonetRows = Math.min(this.nonetRows, this.rowNum);
        },
        /**
         * 计算初始化的结果区域，可以容纳的行列数
         * 保证初始化区域比真正的九宫格区域大一些，不影响后续的逻辑判断，不用考虑特殊情况
         */
        computeInitRegionSize() {
            this.computeRanks(this.$refs.nonet);
            this.nonetCols = this.unitNonetCount(this.xCols) * 3;
            this.nonetRows = this.unitNonetCount(this.yRows) * 3;
            // console.log('this.nonetCols: ', this.nonetCols);
            // console.log('this.nonetRows: ', this.nonetRows);
        },
        /**
         * 计算九宫格的合理大小。
         * 最大尺寸，滚动条区域。就是实际上的行列的宽度，如列宽*列数，cols.width * width
         * 目前此函数无调用
         */
        computeRegionSize() {
            this.computeRanks(this.$refs.nonetData.$el);
            this.computeNonetRanks();
        },
        /**
         * 计算起点坐标
         */
        computePointer(node) {
            this.x = Math.floor(node.scrollLeft / this.width);
            this.y = Math.floor(node.scrollTop / this.height);
            // console.log('this.x: ', this.x);
            // console.log('this.y: ', this.y);
        },
        /**
         * 计算九宫格起点坐标
         */
        computeNonetPointer(rankCols, rankRows) {
            this.nonetX = this.computeNonetPointValue(this.x, this.nonetCols, rankCols || this.columnNum);
            this.nonetY = this.computeNonetPointValue(this.y, this.nonetRows, rankRows || this.rowNum);
            // console.log('this.nonetX: ', this.nonetX);
            // console.log('this.nonetY: ', this.nonetY);
        },
        /**
         * 计算获取数据的起点位置，默认左上角pointer(x,y) =（0,0）位置，以每个小格子为一个坐标单元
         *
         * 起点，初始(0,0)，当大于临界值时，触发后端请求。
         * 临界值，可视区域的起点和可视行列数，对比九宫格起点坐标和行列数判断。
         * 边界检测，需要同时检测起点和终点。
         *
         * watcher x,y 变化，触发边界检查规则时，请求数据。
         * nonetX nonetY 绝对定位的top left。
         */
        relocationPointer(options) {
            let scrollX = this.x;
            let scrollY = this.y;
            this.computePointer(options);
            if (this.x === scrollX && this.y === scrollY) {
                return;
            }
            if (this.x < this.nonetX
                || (this.x + this.xCols >= this.nonetX + this.nonetCols && this.nonetX + this.nonetCols < this.columnNum)
                || (this.y + this.yRows >= this.nonetY + this.nonetRows && this.nonetY + this.nonetRows < this.rowNum)
                || this.y < this.nonetY) {
                // console.log('x ', this.x, this.xCols, this.nonetX, this.nonetCols);
                // console.log('y ', this.y, this.yRows, this.nonetY, this.nonetRows);
                if (this.resetNonet) {
                    this.resetNonet = false;
                    this.computeNonetRanks();
                }
                this.computeNonetPointer();
                this.preDynamicData();
            }
        },
        /**
         * 获取数据区域大小，重置起点坐标，滚动条位置操作
         */
        renderNonetGrid() {
            if (this.resetScroll) {
                this.resetData();
                this.computeInitRegionSize();
            }
        },

        resizeRegionSize() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.renderRegionNonetGrid();
            }, 300);
        },

        /**
         * 不改变滚动条位置渲染数据内容
         */
        renderRegionNonetGrid() {
            let nonetData = this.$refs.nonetData;
            if (!nonetData) {
                return;
            }
            nonetData.update();

            let ode = nonetData.$el;
            this.computePointer(ode);
            this.computeRanks(ode);
            this.resetNonet = true;
            if (this.x < this.nonetX
                || (this.x + this.xCols >= this.nonetX + this.nonetCols && this.nonetX + this.nonetCols < this.columnNum)
                || (this.y + this.yRows >= this.nonetY + this.nonetRows && this.nonetY + this.nonetRows < this.rowNum)
                || this.y < this.nonetY) {
                this.resetNonet = false;
                this.computeNonetRanks();
                this.computeNonetPointer();
                this.preDynamicData();
            }
        },

        preDynamicData() {
            clearTimeout(dataTimer);
            this.isScrolling = true;
            dataTimer = setTimeout(() => {
                this.dynamicData();
            }, 100);
        },

        /**
         * 请求数据
         * x y 起点坐标
         * row col 行数和列数
         */
        dynamicData() {
            // console.log('开始获取数据，范围为：', {...this.nonet});
            let {col, row} = this.nonet;
            let list = new Array(col * row);
            this.rankList = list.fill('1');

            setTimeout(() => {
                this.dealData();
            }, 100);
        },
        
        dealData() {
            this.$nextTick(function () {
                let ode = this.$refs.nonetData.$el;
                if (this.resetScroll && !this.isScrolling) {
                    this.computeRanks(ode);
                    this.checkNonetRanks();
                }
                this.$refs.nonetData.update();
                this.isScrolling = false;
                this.resetScroll = false;
            });
        },

        resetData() {
            this.isScrolling = false;
            this.x = 0;
            this.y = 0;
            this.xCols = 0;
            this.yRows = 0;
            this.nonetX = 0;
            this.nonetY = 0;
            this.nonetCols = 0;
            this.nonetRows = 0;
            let od = this.$refs.nonetData;
            if (od) {
                od.$el.scrollTop = 0;
                od.$el.scrollLeft = 0;
                od.update();
            }
        },

        resize() {},
    },
    watch: {
        width() {
            this.$nextTick(function () {
                this.resizeRegionSize();
            });
        },
        height() {
            this.$nextTick(function () {
                this.resizeRegionSize();
            });
        }
    },
    mounted() {
        this.renderNonetGrid();
        this.dynamicData();
    }
};
</script>

<style lang="less">
@import (reference) url('../../assets/css/variable.less');

.nonet {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #FFFFFF;
    padding: 10px;
    
    &-view {
        height: 100%;
        border: 1px solid rgb(75, 89, 167);
        overflow: hidden;
        position: relative;
    }

    &-thumbnail {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
