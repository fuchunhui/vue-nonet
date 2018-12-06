<template>
    <veui-form class="nonet-setting" ui="inline">
        <veui-field label="宽度">
            <nonet-input :value.sync="localWidth" :min="60" placeholder="最小60px" />
        </veui-field>
        <veui-field label="高度">
            <nonet-input :value.sync="localHeight" :min="30" placeholder="最小30px" />
        </veui-field>
        <veui-field label="列数">
            <nonet-input :value.sync="localColumnNum" placeholder="显示的列数" />
        </veui-field>
        <veui-field label="行数">
            <nonet-input :value.sync="localRowNum" placeholder="显示的行数" />
        </veui-field>
        <veui-checkbox ui="small" v-model="showPointer">
            显示坐标
        </veui-checkbox>
        <veui-checkbox ui="small" v-model="showThumbnail">
            显示缩略图
        </veui-checkbox>
    </veui-form>
</template>

<script>
import NonetInput from './NonetInput';

export default {
    name: 'NonetSetting',

    components: {
        NonetInput
    },

    props: {
        width: {
            type: Number,
            default: 0
        },
        height: {
            type: Number,
            default: 0
        },
        columnNum: {
            type: Number,
            default: 0
        },
        rowNum: {
            type: Number,
            default: 0
        },
        pointer: {
            type: Boolean,
            default: true
        },
        thumbnail: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            localWidth: this.width,
            localHeight: this.height,
            localColumnNum: this.columnNum,
            localRowNum: this.rowNum,
            showPointer: this.pointer,
            showThumbnail: this.thumbnail
        }
    },

    watch: {
        localWidth(val) {
            this.$emit('update:width', val);
        },
        localHeight(val) {
            this.$emit('update:height', val);
        },
        localColumnNum(val) {
            this.$emit('update:columnNum', val);
        },
        localRowNum(val) {
            this.$emit('update:rowNum', val);
        },
        showPointer(val) {
            this.$emit('update:pointer', val);
        },
        showThumbnail(val) {
            this.$emit('update:thumbnail', val);
        }
    }
}
</script>

<style lang="less">
.nonet-setting {
    display: flex;
    align-items: center;
    .veui-field {
        .veui-form-label {
            height: 24px;
            line-height: 24px;
            padding-right: 4px;
        }
    }
}
</style>
