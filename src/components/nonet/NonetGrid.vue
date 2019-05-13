<template>
    <div class="nonet-grid">
        <slot>
            <span
                v-for="(item, index) in list"
                :key="index | realKey(nonet)"
                :style="{
                    width: `${width}px`,
                    height: `${height}px`,
                    lineHeight: `${height}px`
                }"
                class="nonet-grid-cell">
                <template v-if="pointer">
                    {{ index | realKey(nonet) | bothValue(item.value)}}
                </template>
                <template v-else>
                    {{ item.value }}
                </template>
            </span>
        </slot>
    </div>
</template>

<script>
export default {
    name: 'NonetGrid',

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
            default: false
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
    }
};
</script>

<style lang="less">
.nonet-grid {
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
