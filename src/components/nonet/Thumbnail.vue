<template>
    <div class="thumbnail">
        thumbnail
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
    border: 1px solid red;
    background: yellow;
}
</style>
