<template>
    <div class="data-grid">
        <span
            v-for="(item, index) in realList"
            :key="index | realKey(nonet)"
            :style="{
                width: `${width}px`,
                height: `${height}px`,
                lineHeight: `${height}px`,
                color: item.color,
                background: item.backgroundColor
            }"
            class="data-grid-cell">
            <template v-if="pointer">
                {{ index | realKey(nonet) }}
            </template>
            <template v-else>
                {{ item.value }}
            </template>
        </span>
    </div>
</template>

<script>
export default {
    name: 'DataGrid',

    props: {
        nonet: {
            type: Object,
            default: () => {
                return {};
            }
        },
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
        pointer: {
            type: Boolean,
            default: true
        },
        list: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {};
    },

    filters: {
        realKey(value, nonet) {
            let {x, y, col} = nonet;
            let xc = value % col;
            let realX = x + xc + 1;
            let realY = y + (value - xc) / col + 1;
            return `${realX}, ${realY}`;
        }
    },

    computed: {
        realList() {
            let result = [];
            this.list.forEach(item => {
                result.push({
                    value: Math.floor(Math.random() * 100),
                    color: '#3AF78A',
                    backgroundColor: '#FFFFFF'
                });
            });
            return result;
        }
    }
};
</script>

<style lang="less">
.data-grid {
    position: absolute;
    border-right: 1px solid #DDDEE4;
    overflow: hidden;
    &-cell {
        position: relative;
        float: left;
        border-left: 1px solid #DDDEE4;
        border-bottom: 1px solid #DDDEE4;
        padding: 0 2px;
        font-size: 12px;
        text-align: center;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: default;
    }
}
</style>
