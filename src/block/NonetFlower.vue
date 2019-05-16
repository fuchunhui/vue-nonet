<template>
    <div class="nonet-flower" ref="nonetFlower">
        <nonet
            :width="cellWidth"
            :height="cellHeight"
            :columnNum="colCount"
            :rowNum="rowCount"
            :list="list"
            @nonetChange="nonetChange"
            :target="$refs.nonetFlower">
            <template slot-scope="slotProps">
                <div
                    v-for="(item, index) in list"
                    :key="index | realKey(slotProps.nonet)"
                    :style="{
                        width: `${cellWidth}px`,
                        height: `${cellHeight}px`,
                        lineHeight: `${cellHeight}px`
                    }"
                    class="nonet-grid-cell">
                    <img :src="item.url" :title="item.name" :alt="item.name"/>
                </div>
            </template>
        </nonet>
    </div>
</template>

<script>
import Nonet from '../components/nonet/Nonet.vue';

export default {
    name: 'NonetFlower',

    components: {
        Nonet
    },

    data() {
        return {
            cellWidth: 122,
            cellHeight: 122,
            colCount: 1000,
            rowCount: 1000,
            viewList: [],
            nonet: {},
            flowerList: null
        };
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
        }
    },

    computed: {
        list() {
            let list = [];
            this.viewList.forEach((item, index) => {
                let flower = this.flowerList[index % this.flowerList.length];
                list.push({
                    ...flower
                });
            });
            return list;
        }
    },

    methods: {
        nonetChange({nonet}) {
            this.viewList = new Array(nonet.col * nonet.row).fill('1');
        }
    },

    mounted() {
        this.flowerList = require('../lib/flower.json');
    }
};
</script>

<style lang="less">
.nonet-flower {
    height: 100%;
    width: 100%;
}
</style>
