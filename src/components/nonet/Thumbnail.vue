<template>
    <div class="thumbnail">
        <div class="thumbnail-wrapper">
            <div class="thumbnail-total" :style="{
                width: `${total.col}px`,
                height: `${total.row}px`
            }"/>
            <div class="thumbnail-nonet" :style="{
                top: `${nonet.y}px`,
                left: `${nonet.x}px`,
                width: `${nonet.col}px`,
                height: `${nonet.row}px`
            }"/>
            <div class="thumbnail-view" :style="{
                top: `${view.y}px`,
                left: `${view.x}px`,
                width: `${view.col}px`,
                height: `${view.row}px`
            }"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Thumbnail',
    props: {
        view: {
            type: Object,
            default: () => {
                return {
                    x: 0,
                    y: 0,
                    col: 0,
                    row: 0
                };
            }
        },
        nonet: {
            type: Object,
            default: () => {
                return {
                    x: 0,
                    y: 0,
                    col: 0,
                    row: 0
                };
            }
        },
        total: {
            type: Object,
            default: () => {
                return {
                    col: 0,
                    row: 0
                };
            }
        }
    },
    data() {
        return {

        };
    },
    methods: {

    }
};
</script>

<style lang="less">
.thumbnail {
    width: 320px;
    height: 180px;
    border: 1px solid #3A87FF;
    background: yellow;
    overflow: hidden;
    &-wrapper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: auto;
    }
    &-total {
        position: absolute;
        top: 0;
        left: 0;
        background-color: #FFFFFF;
        z-index: 1;
    }
    &-nonet {
        position: absolute;
        background-color: #FFFFFF;
        border: 1px solid red;
        z-index: 2;
    }
    &-view {
        position: absolute;
        background-color: #3AF78A;
        z-index: 3;
    }
}
</style>
