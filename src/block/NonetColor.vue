<template>
    <div class="nonet-color" ref="nonetColor">
        <nonet
            :width="cellWidth"
            :height="cellHeight"
            :columnNum="colCount"
            :rowNum="rowCount"
            :list="list"
            @nonetChange="nonetChange"
            :target="$refs.nonetColor">
            <template slot-scope="slotProps">
                <div
                    v-for="(item, index) in list"
                    :key="index | realKey(slotProps.nonet)"
                    :style="{
                        width: `${cellWidth}px`,
                        height: `${cellHeight}px`,
                        lineHeight: `${cellHeight}px`,
                        color: item.color,
                        background: item.backgroundColor,
                        borderRadius: '4px'
                    }"
                    class="nonet-grid-cell">
                    <span :title="item.value">
                        {{ item.value }}
                    </span>
                </div>
            </template>
        </nonet>
    </div>
</template>

<script>
import Nonet from '../components/nonet/Nonet.vue';

export default {
    name: 'NonetColor',

    components: {
        Nonet
    },

    data() {
        return {
            cellWidth: 64,
            cellHeight: 64,
            colCount: 1000,
            rowCount: 1000,
            viewList: []
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
            this.viewList.forEach(() => {
                list.push({
                    value: Math.floor(Math.random(100) * 100),
                    backgroundColor: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16)
                });
            });
            return list;
        }
    },

    methods: {
        nonetChange({nonet}) {
            this.viewList = new Array(nonet.col * nonet.row).fill('1');   
        }
    }
};
</script>

<style lang="less">
.nonet-color {
    height: 100%;
    width: 100%;
}
</style>
